import{_ as s,o as n,c as a,a as l}from"./app.c25d72b6.js";const p="/\u5C0F\u7A0B\u5E8F/app\u5730\u56FE\u7F57\u76D8.png",E=JSON.parse('{"title":"GIS\u5730\u56FE-\u5730\u56FE\u7F57\u76D8","description":"","frontmatter":{"title":"GIS\u5730\u56FE-\u5730\u56FE\u7F57\u76D8"},"headers":[{"level":3,"title":"\u5730\u56FE\u7F57\u76D8","slug":"\u5730\u56FE\u7F57\u76D8","link":"#\u5730\u56FE\u7F57\u76D8","children":[]}],"relativePath":"App-\u5C0F\u7A0B\u5E8F/APP\u5E94\u7528(\u4E5D)\uFF1AGIS\u5730\u56FE-\u7F57\u76D8.md"}'),o={name:"App-\u5C0F\u7A0B\u5E8F/APP\u5E94\u7528(\u4E5D)\uFF1AGIS\u5730\u56FE-\u7F57\u76D8.md"},e=l('<h1 id="gis\u5730\u56FE-\u5730\u56FE\u7F57\u76D8" tabindex="-1">GIS\u5730\u56FE-\u5730\u56FE\u7F57\u76D8 <a class="header-anchor" href="#gis\u5730\u56FE-\u5730\u56FE\u7F57\u76D8" aria-hidden="true">#</a></h1><h3 id="\u5730\u56FE\u7F57\u76D8" tabindex="-1">\u5730\u56FE\u7F57\u76D8 <a class="header-anchor" href="#\u5730\u56FE\u7F57\u76D8" aria-hidden="true">#</a></h3><ul><li><p>\u5229\u7528Mapbox \u7684 \u81EA\u5E26\u7684\u5B9A\u4F4DGeolocateControl \u83B7\u53D6\u7528\u6237\u4F4D\u7F6E\uFF0C\u7136\u540E\u521B\u5EFA\u4E00\u4E2A\u9759\u6001\u7684\u7F57\u76D8UI\uFF0C\u4E0A\u5317\u4E0B\u5357\uFF0C\u5DE6\u897F\u53F3\u4E1C\uFF0C\u56DB\u4E2A\u65B9\u5411\u6307\u793A</p></li><li><p>\u5C06\u7F57\u76D8\u4F5C\u4E3A Marker \u6DFB\u52A0\u5230\u5730\u56FE\u4E0A\u7684GeolocateControl\u5F53\u524D\u4F4D\u7F6E\u3002</p></li></ul><img src="'+p+`" width="200" height="200"><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u521B\u5EFA\u9759\u6001\u7F57\u76D8\u5143\u7D20</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> compassEl </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createElement</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">div</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    compassEl</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">className </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">location-compass</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    compassEl</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">innerHTML </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">      &lt;div class=&quot;compass-container&quot;&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;div class=&quot;compass-ring&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;div class=&quot;compass-directions&quot;&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">          &lt;div class=&quot;direction-wrapper&quot;&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;span class=&quot;direction north&quot;&gt;\u5317&lt;/span&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;span class=&quot;direction east&quot;&gt;\u4E1C&lt;/span&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;span class=&quot;direction south&quot;&gt;\u5357&lt;/span&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;span class=&quot;direction west&quot;&gt;\u897F&lt;/span&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">          &lt;/div&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">      &lt;/div&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// TODO: \u6DFB\u52A0\u7F57\u76D8\u6837\u5F0F (renderjs\u4E2D\u4F7F\u7528rpx\u6837\u5F0F\u4F1A\u5931\u6548\uFF0C\u5177\u4F53\u539F\u56E0\u4E0D\u77E5)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> style </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createElement</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">style</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    style</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">textContent </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">      .location-compass {</span></span>
<span class="line"><span style="color:#C3E88D;">        width: 120px;</span></span>
<span class="line"><span style="color:#C3E88D;">        height: 120px;</span></span>
<span class="line"><span style="color:#C3E88D;">        position: relative;</span></span>
<span class="line"><span style="color:#C3E88D;">      }</span></span>
<span class="line"><span style="color:#C3E88D;">      .compass-container {</span></span>
<span class="line"><span style="color:#C3E88D;">        width: 100%;</span></span>
<span class="line"><span style="color:#C3E88D;">        height: 100%;</span></span>
<span class="line"><span style="color:#C3E88D;">        position: relative;</span></span>
<span class="line"><span style="color:#C3E88D;">      }</span></span>
<span class="line"><span style="color:#C3E88D;">      .compass-ring {</span></span>
<span class="line"><span style="color:#C3E88D;">        position: absolute;</span></span>
<span class="line"><span style="color:#C3E88D;">        width: 100%;</span></span>
<span class="line"><span style="color:#C3E88D;">        height: 100%;</span></span>
<span class="line"><span style="color:#C3E88D;">        border: 2px solid rgba(255, 255, 255, 0.8);</span></span>
<span class="line"><span style="color:#C3E88D;">        border-radius: 50%;</span></span>
<span class="line"><span style="color:#C3E88D;">        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);</span></span>
<span class="line"><span style="color:#C3E88D;">      }</span></span>
<span class="line"><span style="color:#C3E88D;">      .compass-directions {</span></span>
<span class="line"><span style="color:#C3E88D;">        position: absolute;</span></span>
<span class="line"><span style="color:#C3E88D;">        width: 140%;</span></span>
<span class="line"><span style="color:#C3E88D;">        height: 140%;</span></span>
<span class="line"><span style="color:#C3E88D;">        left: -20%;</span></span>
<span class="line"><span style="color:#C3E88D;">        top: -20%;</span></span>
<span class="line"><span style="color:#C3E88D;">        pointer-events: none;</span></span>
<span class="line"><span style="color:#C3E88D;">      }</span></span>
<span class="line"><span style="color:#C3E88D;">      .direction-wrapper {</span></span>
<span class="line"><span style="color:#C3E88D;">        position: absolute;</span></span>
<span class="line"><span style="color:#C3E88D;">        width: 100%;</span></span>
<span class="line"><span style="color:#C3E88D;">        height: 100%;</span></span>
<span class="line"><span style="color:#C3E88D;">      }</span></span>
<span class="line"><span style="color:#C3E88D;">      .compass-directions .direction {</span></span>
<span class="line"><span style="color:#C3E88D;">        position: absolute;</span></span>
<span class="line"><span style="color:#C3E88D;">        font-size: 18px;</span></span>
<span class="line"><span style="color:#C3E88D;">        color: #fff;</span></span>
<span class="line"><span style="color:#C3E88D;">        text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);</span></span>
<span class="line"><span style="color:#C3E88D;">        font-weight: bold;</span></span>
<span class="line"><span style="color:#C3E88D;">      }</span></span>
<span class="line"><span style="color:#C3E88D;">      .compass-directions .north {</span></span>
<span class="line"><span style="color:#C3E88D;">        top: 0;</span></span>
<span class="line"><span style="color:#C3E88D;">        left: 50%;</span></span>
<span class="line"><span style="color:#C3E88D;">        transform: translateX(-50%);</span></span>
<span class="line"><span style="color:#C3E88D;">        color: #FF4B4B;</span></span>
<span class="line"><span style="color:#C3E88D;">        font-weight: 900;</span></span>
<span class="line"><span style="color:#C3E88D;">        font-size: 22px;</span></span>
<span class="line"><span style="color:#C3E88D;">        text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);</span></span>
<span class="line"><span style="color:#C3E88D;">      }</span></span>
<span class="line"><span style="color:#C3E88D;">      .compass-directions .south {</span></span>
<span class="line"><span style="color:#C3E88D;">        bottom: 0;</span></span>
<span class="line"><span style="color:#C3E88D;">        left: 50%;</span></span>
<span class="line"><span style="color:#C3E88D;">        transform: translateX(-50%);</span></span>
<span class="line"><span style="color:#C3E88D;">      }</span></span>
<span class="line"><span style="color:#C3E88D;">      .compass-directions .east {</span></span>
<span class="line"><span style="color:#C3E88D;">        right: 0;</span></span>
<span class="line"><span style="color:#C3E88D;">        top: 50%;</span></span>
<span class="line"><span style="color:#C3E88D;">        transform: translateY(-50%);</span></span>
<span class="line"><span style="color:#C3E88D;">      }</span></span>
<span class="line"><span style="color:#C3E88D;">      .compass-directions .west {</span></span>
<span class="line"><span style="color:#C3E88D;">        left: 0;</span></span>
<span class="line"><span style="color:#C3E88D;">        top: 50%;</span></span>
<span class="line"><span style="color:#C3E88D;">        transform: translateY(-50%);</span></span>
<span class="line"><span style="color:#C3E88D;">      }</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#A6ACCD;">    document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">head</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">appendChild</span><span style="color:#A6ACCD;">(style)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u7F57\u76D8\u4F4D\u7F6E</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> locationMarker </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u76D1\u542C\u5B9A\u4F4D\u8DDF\u8E2A\u4E8B\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">    geolocate</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">on</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">geolocate</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">coords</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">coords</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">locationMarker</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">locationMarker</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">mapboxgl</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Marker</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">          element</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">compassEl</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">          rotationAlignment</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">map</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setLngLat</span><span style="color:#F07178;">([</span><span style="color:#A6ACCD;">coords</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">longitude</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">coords</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">latitude</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addTo</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">map</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">locationMarker</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setLngLat</span><span style="color:#F07178;">([</span><span style="color:#A6ACCD;">coords</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">longitude</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">coords</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">latitude</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#676E95;">// \u53D6\u6D88GeolocateControl\u6FC0\u6D3B\u72B6\u6001(\u624B\u52A8\u53D6\u6D88\u4F1A\u89E6\u53D1\u8BE5\u65B9\u6CD5)</span></span>
<span class="line"><span style="color:#A6ACCD;">		geolocate</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">on</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">trackuserlocationend</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">			</span><span style="color:#676E95;">// \u79FB\u9664\u7F57\u76D8dom</span></span>
<span class="line"><span style="color:#F07178;">		  </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">locationMarker</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">				</span><span style="color:#A6ACCD;">locationMarker</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">remove</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">				</span><span style="color:#A6ACCD;">locationMarker</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null;</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> geolocate</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"></span></code></pre></div>`,5),t=[e];function c(r,D,y,i,F,C){return n(),a("div",null,t)}const d=s(o,[["render",c]]);export{E as __pageData,d as default};
