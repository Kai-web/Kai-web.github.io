---
layout: home

hero:
  name: Wang Kaibing
  home: true
  text: Hi, guys, this is my daily record!
  tagline: 记录我的学习和编码。这是一个碎片化、结构化、体系化的个人知识库......
  image:
    src: /logo.png
    alt: VitePress
  actions:
    - theme: brand
      text: 查看更多
      link: '/思维导图/Git操作'
    - theme: alt
      text: 访问我的Github
      link: https://github.com/Kai-web

features:
  - icon: ⚡️
    title: 博客
    details: 和大家平常见到的常规博客或随笔一样，可能偶尔一个小时或半天的时间输出一小块内容。碎片化、结构化、体系化的个人知识库。
  - icon: 💡
    title: 随笔
    details: 更多则是自己平常通过视频教程，文档等学习做的笔记，更多是初次接触某个领域所做的笔记，相对来说更多带有自己的思考和理解。
  - icon: 🖖
    title: 记录
    details: 学习优秀的开源作品，同时将学习到的知识记录下来，梳理所学，便于记录的内容被再次利用，不用再担心掌握的知识无迹可寻。
---

<script setup>
  import { onMounted } from 'vue'
  // alert('站点部署在Github (搜索引擎无法收录)，国内访问较慢，请耐心等待。')

  // features跳转
  //import menu1Sidebar from "./.vitepress/menu1Sidebar";
  onMounted(() => {
      const cards = document.getElementsByTagName('article')
      for (let i=0; i<cards.length; i++){
        cards[i].classList.add('article')
        let title = cards[i].childNodes[1].innerHTML
        cards[i].addEventListener('click',()=> {
          window.location.replace(menu1Sidebar.find(x => x.text === title).items[0].link.replace(/.md/g,'.html'))
        })
      }

      // Init Context
      let c = document.createElement('canvas').getContext('2d')
      let postctx = document.body.appendChild(document.createElement('canvas')).getContext('2d')
      let canvas = c.canvas
      let vertices = []

      // Effect Properties
      let vertexCount = 7000
      let vertexSize = 3
      let oceanWidth = 204
      let oceanHeight = -80
      let gridSize = 32;
      let waveSize = 16;
      let perspective = 100;

      // Common variables
      let depth = (vertexCount / oceanWidth * gridSize)
      let frame = 0
      let { sin, cos, tan, PI } = Math

      // Render loop
      let loop = () => {
        let rad = sin(frame / 100) * PI / 20
        let rad2 = sin(frame / 50) * PI / 10
        frame++
        if (postctx.canvas.width !== postctx.canvas.offsetWidth || postctx.canvas.height !== postctx.canvas.offsetHeight) { 
          postctx.canvas.width = canvas.width = postctx.canvas.offsetWidth
          postctx.canvas.height = canvas.height = postctx.canvas.offsetHeight
        }

        
        c.fillStyle = `hsl(200deg, 100%, 2%)`
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.save()
        c.translate(canvas.width / 2, canvas.height / 2)
        
        c.beginPath()
        vertices.forEach((vertex, i) => {
          let ni = i + oceanWidth
          let x = vertex[0] - frame % (gridSize * 2)
          let z = vertex[2] - frame * 2 % gridSize + (i % 2 === 0 ? gridSize / 2 : 0)
          let wave = (cos(frame / 45 + x / 50) - sin(frame / 20 + z / 50) + sin(frame / 30 + z*x / 10000))
          let y = vertex[1] + wave * waveSize
          let a = Math.max(0, 1 - (Math.sqrt(x ** 2 + z ** 2)) / depth)
          let tx, ty, tz
          
          y -= oceanHeight
          
          // Transformation variables
          tx = x
          ty = y
          tz = z

          // Rotation Y
          tx = x * cos(rad) + z * sin(rad)
          tz = -x * sin(rad) + z * cos(rad)
          
          x = tx
          y = ty
          z = tz
          
          // Rotation Z
          tx = x * cos(rad) - y * sin(rad)
          ty = x * sin(rad) + y * cos(rad) 
          
          x = tx;
          y = ty;
          z = tz;
          
          // Rotation X
          
          ty = y * cos(rad2) - z * sin(rad2)
          tz = y * sin(rad2) + z * cos(rad2)
          
          x = tx;
          y = ty;
          z = tz;

          x /= z / perspective
          y /= z / perspective
          
          
              
          if (a < 0.01) return
          if (z < 0) return
        
          
          c.globalAlpha = a
          c.fillStyle = `hsl(${180 + wave * 20}deg, 100%, 50%)`
          c.fillRect(x - a * vertexSize / 2, y - a * vertexSize / 2, a * vertexSize, a * vertexSize)
          c.globalAlpha = 1
        })
        c.restore()
        
        // Post-processing
        postctx.drawImage(canvas, 0, 0)
        
        postctx.globalCompositeOperation = "screen"
        postctx.filter = 'blur(16px)'
        postctx.drawImage(canvas, 0, 0)
        postctx.filter = 'blur(0)'
        postctx.globalCompositeOperation = "source-over"
        
        requestAnimationFrame(loop)
      }

      // Generating dots
      for (let i = 0; i < vertexCount; i++) {
        let x = i % oceanWidth
        let y = 0
        let z = i / oceanWidth >> 0
        let offset = oceanWidth / 2
        vertices.push([(-offset + x) * gridSize, y * gridSize, z * gridSize])
      }

      loop()
    })
</script>

<style>
    :root {
        --vp-home-hero-name-color: transparent;
        --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
        --vp-home-hero-image-background-image: linear-gradient(-45deg,#bd34fe 50%,#4c09b9 50%);
        --vp-home-hero-image-filter: blur(80px);
    }
    /* 隐藏主题切换 */
    .VPNavBarAppearance {
      display: none !important;
    }
    .VPContent {
      z-index: 1;
    }
    /* 粒子特效 */
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .article {
      margin-left: -6px;
      box-shadow: 0 0 3px rgba(204,204,204,.6);
    }
    .article:hover {
      -webkit-transition-duration: 0.3s;
      transition-duration: 0.3s;
      -webkit-transition-property: box-shadow, transform;
      transition-property: box-shadow, transform;
      -webkit-box-shadow: #ccc 0px 0px 5px 5px;
      -moz-box-shadow: #ccc 0px 0px 5px 5px;
      box-shadow: #ccc 0px 0px 5px 5px;
    }
</style>
