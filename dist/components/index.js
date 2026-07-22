import { createRequire } from 'module';

createRequire(import.meta.url);

// src/components/styles/random-featured-article.scss
var random_featured_article_default = ".featured-article-content {\n  padding: 24px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border-radius: 8px;\n  margin: 20px 0;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n\n.featured-article-title {\n  margin: 0 0 12px 0;\n  font-size: 1.5em;\n  font-weight: 700;\n  line-height: 1.3;\n}\n\n.featured-article-link {\n  color: white;\n  text-decoration: none;\n  border-bottom: 2px solid rgba(255, 255, 255, 0.3);\n  transition: border-bottom-color 0.2s ease;\n}\n.featured-article-link:hover {\n  border-bottom-color: rgba(255, 255, 255, 0.8);\n}\n\n.featured-article-excerpt {\n  margin: 0 0 16px 0;\n  font-size: 0.95em;\n  line-height: 1.6;\n  opacity: 0.95;\n}\n\n.featured-article-button {\n  display: inline-block;\n  padding: 10px 20px;\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n  text-decoration: none;\n  border-radius: 4px;\n  font-weight: 600;\n  transition: background-color 0.2s ease;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n}\n.featured-article-button:hover {\n  background: rgba(255, 255, 255, 0.3);\n  border-color: rgba(255, 255, 255, 0.5);\n}\n\n@media (max-width: 768px) {\n  .featured-article-content {\n    padding: 16px;\n    margin: 16px 0;\n  }\n  .featured-article-title {\n    font-size: 1.25em;\n  }\n  .featured-article-excerpt {\n    font-size: 0.9em;\n  }\n}";

// src/components/scripts/random-featured-article.inline.ts
var random_featured_article_inline_default = 'function A(t){let n=Math.sin(t++)*1e4;return n-Math.floor(n)}function w(){let t=new Date,n=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),e=String(t.getDate()).padStart(2,"0"),a=`${n}${r}${e}`;return Number.parseInt(a,10)}function y(t,n){let r=t.toLowerCase();return n.some(e=>{let a=e.toLowerCase();return r===a||r===a.replace(/\\/$/,"")})}function g(t){let n={"&":"&amp;","<":"&lt;",">":"&gt;",\'"\':"&quot;","\'":"&#039;"};return t.replace(/[&<>"\']/g,r=>n[r]||r)}async function $(t,n,r){try{let e=await fetch("./index.json");if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);let a=await e.json(),m=Array.isArray(a)?a:a.content||[];r&&console.log("[RandomFeaturedArticle] Loaded index from file:",m.length,"items");let l=m.filter(d=>{let o=d.slug||"",i=d.title||"";return!o.endsWith("index")&&i&&i.length>0});if(l.length>0){let d=Math.floor(A(n)*l.length),o=l[d];if(!o)return;let i=o.slug||"",u=o.title||"Featured Article",f=o.excerpt||o.description||"Check out this article from our collection!",c=`\n        <div class="featured-article-content">\n          <h2 class="featured-article-title">\n            <a href="${i}" class="featured-article-link">${g(u)}</a>\n          </h2>\n          <p class="featured-article-excerpt">${g(f)}</p>\n          <a href="${i}" class="featured-article-button">Read More \\u2192</a>\n        </div>\n      `;t.innerHTML=c,r&&console.log("[RandomFeaturedArticle] Featured article populated from fallback")}}catch(e){r&&console.error("[RandomFeaturedArticle] Error loading index:",e)}}function F(){let t=document.getElementById("featured-article-init");if(!t){console.warn("[RandomFeaturedArticle] Init element not found");return}let n=t.getAttribute("data-page-title")||"Welcome to Tara - The World of Solara | Tara, the world of Solara",r=t.getAttribute("data-activate-urls")||"",e=t.getAttribute("data-debug")==="true",a=r.split("|").filter(s=>s.length>0);if(e&&console.log("[RandomFeaturedArticle] Initializing...",{currentUrl:window.location.href,pageTitle:document.title,expectedPageTitle:n,activateUrls:a}),!(document.title===n&&y(window.location.href,a))){e&&console.log("[RandomFeaturedArticle] Not on correct page, skipping");return}e&&console.log("[RandomFeaturedArticle] On correct page, proceeding...");let l=document.getElementById("featured-article");if(!l){e&&console.warn("[RandomFeaturedArticle] Could not find #featured-article div");return}let o=window.contentIndex;if(!o||!Array.isArray(o)){e&&console.warn("[RandomFeaturedArticle] Content index not available",{contentIndex:typeof o});let s=w();$(l,s,e);return}e&&console.log("[RandomFeaturedArticle] Found content index with",o.length,"items");let i=o.filter(s=>{let b=s.slug||"",h=s.title||"";return!b.endsWith("index")&&h&&h.length>0});if(i.length===0){e&&console.warn("[RandomFeaturedArticle] No articles found in index");return}e&&console.log("[RandomFeaturedArticle] Found",i.length,"articles");let u=w(),f=Math.floor(A(u)*i.length),c=i[f];if(!c)return;e&&console.log("[RandomFeaturedArticle] Selected article:",{seed:u,randomIndex:f,article:c});let p=c.slug||"",I=c.title||"Featured Article",R=c.excerpt||c.description||"Check out this article from our collection!",C=`\n    <div class="featured-article-content">\n      <h2 class="featured-article-title">\n        <a href="${p}" class="featured-article-link">${g(I)}</a>\n      </h2>\n      <p class="featured-article-excerpt">${g(R)}</p>\n      <a href="${p}" class="featured-article-button">Read More \\u2192</a>\n    </div>\n  `;l.innerHTML=C,e&&console.log("[RandomFeaturedArticle] Featured article populated successfully")}function v(){setTimeout(F,100)}document.addEventListener("nav",v);var x=window;x.addCleanup&&x.addCleanup(()=>{document.removeEventListener("nav",v)});F();\n';
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, o2, r2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((o2 = i2.constructor) && null != o2.getDerivedStateFromError && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  return l.vnode && l.vnode(l2), l2;
}

// src/components/RandomFeaturedArticle.tsx
var RandomFeaturedArticle_default = ((opts) => {
  const defaultUrls = [
    "https://apolo49.github.io/before-the-start-dnd-campaign-notes/",
    "https://apolo49.github.io/before-the-start-dnd-campaign-notes/index"
  ];
  const {
    pageTitle = "Welcome to Tara - The World of Solara | Tara, the world of Solara",
    activateUrls = defaultUrls,
    debug = false
  } = opts ?? {};
  const Component = (_props) => {
    return /* @__PURE__ */ u2(
      "div",
      {
        id: "featured-article-init",
        "data-page-title": pageTitle,
        "data-activate-urls": activateUrls.join("|"),
        "data-debug": debug ? "true" : "false"
      }
    );
  };
  Component.css = random_featured_article_default;
  Component.afterDOMLoaded = random_featured_article_inline_default;
  return Component;
});

export { RandomFeaturedArticle_default as RandomFeaturedArticle };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map