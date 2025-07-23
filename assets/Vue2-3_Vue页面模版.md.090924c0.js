import{_ as s,o as n,c as a,a as l}from"./app.c25d72b6.js";const i=JSON.parse('{"title":"\u751F\u6210Vue\u9875\u9762\u6A21\u7248","description":"","frontmatter":{"title":"\u751F\u6210Vue\u9875\u9762\u6A21\u7248"},"headers":[],"relativePath":"Vue2-3/Vue\u9875\u9762\u6A21\u7248.md"}'),p={name:"Vue2-3/Vue\u9875\u9762\u6A21\u7248.md"},o=l(`<h1 id="\u751F\u6210vue\u9875\u9762\u6A21\u7248" tabindex="-1">\u751F\u6210Vue\u9875\u9762\u6A21\u7248 <a class="header-anchor" href="#\u751F\u6210vue\u9875\u9762\u6A21\u7248" aria-hidden="true">#</a></h1><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">$</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">COMPONENT_NAME</span><span style="color:#89DDFF;">}&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">// \u8FD9\u91CC\u53EF\u4EE5\u5BFC\u5165\u5176\u4ED6\u6587\u4EF6\uFF08\u6BD4\u5982\uFF1A\u7EC4\u4EF6\uFF0C\u5DE5\u5177js\uFF0C\u7B2C\u4E09\u65B9\u63D2\u4EF6js\uFF0Cjson\u6587\u4EF6\uFF0C\u56FE\u7247\u6587\u4EF6\u7B49\u7B49\uFF09</span></span>
<span class="line"><span style="color:#A6ACCD;">// \u4F8B\u5982\uFF1Aimport \u300A\u7EC4\u4EF6\u540D\u79F0\u300B from &#39;\u300A\u7EC4\u4EF6\u8DEF\u5F84\u300B&#39;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">export default </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u7EC4\u4EF6\u540D\uFF0Ckeep-alive\u65F6\uFF0C\u53EF\u642D\u914D\u7EC4\u4EF6name\u8FDB\u884C\u7F13\u5B58\u8FC7\u6EE4</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\${COMPONENT_NAME}</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u5C40\u90E8\u6CE8\u518C\u7EC4\u4EF6\uFF0Cimport\u5F15\u5165\u7684\u7EC4\u4EF6\u9700\u8981\u6CE8\u5165\u5230\u5BF9\u8C61\u4E2D\u624D\u80FD\u4F7F\u7528</span></span>
<span class="line"><span style="color:#A6ACCD;">  components: </span><span style="color:#89DDFF;">{},</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u5206\u53D1 Vue \u7EC4\u4EF6\u4E2D\u53EF\u590D\u7528\u529F\u80FD</span></span>
<span class="line"><span style="color:#A6ACCD;">  mixins: []</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// \u8FD9\u91CC\u5B58\u653E\u6570\u636E</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">data</span><span style="color:#A6ACCD;"> () </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    return {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u76D1\u63A7\u81EA\u5DF1\u5B9A\u4E49\u7684\u53D8\u91CF\uFF0C\u8BE5\u53D8\u91CF\u4E0D\u5728data\u91CC\u9762\u58F0\u660E\uFF0C\u76F4\u63A5\u5728computed\u91CC\u9762\u5B9A\u4E49</span></span>
<span class="line"><span style="color:#A6ACCD;">  computed: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u76D1\u63A7data\u4E2D\u7684\u6570\u636E\u53D8\u5316\uFF0C\u4E00\u822C\u7528\u4E8E\u76D1\u63A7\u8DEF\u7531\u3001input\u8F93\u5165\u6846\u7684\u503C\u7279\u6B8A\u5904\u7406\u7B49\u7B49\uFF0C\u6BD4\u8F83\u9002\u5408\u7684\u573A\u666F\u662F\u4E00\u4E2A\u6570\u636E\u5F71\u54CD\u591A\u4E2A\u6570\u636E</span></span>
<span class="line"><span style="color:#A6ACCD;">  watch: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u65B9\u6CD5\u96C6\u5408</span></span>
<span class="line"><span style="color:#A6ACCD;">  methods: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u751F\u547D\u5468\u671F - \u521B\u5EFA\u5B8C\u6210\uFF08\u53EF\u4EE5\u8BBF\u95EE\u5F53\u524Dthis\u5B9E\u4F8B\uFF09</span></span>
<span class="line"><span style="color:#A6ACCD;">  created () </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u751F\u547D\u5468\u671F - \u6302\u8F7D\u5B8C\u6210\uFF08\u53EF\u4EE5\u8BBF\u95EEDOM\u5143\u7D20\uFF09</span></span>
<span class="line"><span style="color:#A6ACCD;">  mounted () </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u751F\u547D\u5468\u671F - \u521B\u5EFA\u4E4B\u524D</span></span>
<span class="line"><span style="color:#A6ACCD;">  beforeCreate () </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u751F\u547D\u5468\u671F - \u6302\u8F7D\u4E4B\u524D</span></span>
<span class="line"><span style="color:#A6ACCD;">  beforeMount () </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u751F\u547D\u5468\u671F - \u66F4\u65B0\u4E4B\u524D</span></span>
<span class="line"><span style="color:#A6ACCD;">  beforeUpdate () </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u751F\u547D\u5468\u671F - \u66F4\u65B0\u4E4B\u540E</span></span>
<span class="line"><span style="color:#A6ACCD;">  updated () </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u751F\u547D\u5468\u671F - \u9500\u6BC1\u4E4B\u524D</span></span>
<span class="line"><span style="color:#A6ACCD;">  beforeDestroy () </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u751F\u547D\u5468\u671F - \u9500\u6BC1\u5B8C\u6210</span></span>
<span class="line"><span style="color:#A6ACCD;">  destroyed () </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u5982\u679C\u9875\u9762\u6709keep-alive\u7F13\u5B58\u529F\u80FD\uFF0C\u8FD9\u4E2A\u51FD\u6570\u4F1A\u89E6\u53D1</span></span>
<span class="line"><span style="color:#A6ACCD;">  activated () </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">less</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">scoped</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">// \u9700\u63D0\u524D\u5B89\u88C5less\u4F9D\u8D56</span></span>
<span class="line"><span style="color:#A6ACCD;">// \u53EF\u5F15\u5165\u516C\u5171\u6837\u5F0F</span></span>
<span class="line"><span style="color:#A6ACCD;">// \u4F8B\u5982\uFF1A@import &quot;../../css/table.less&quot;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,2),e=[o];function c(t,D,r,y,C,A){return n(),a("div",null,e)}const d=s(p,[["render",c]]);export{i as __pageData,d as default};
