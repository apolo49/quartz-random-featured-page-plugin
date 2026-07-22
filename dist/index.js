import { createRequire } from 'module';

createRequire(import.meta.url);

// src/components/styles/random-featured-article.scss
var random_featured_article_default = ".featured-article-content {\n  padding: 24px;\n  background: linear-gradient(135deg, var(--accent-color, #667eea) 0%, var(--accent-secondary, #764ba2) 100%);\n  color: var(--text-light, white);\n  border-radius: 8px;\n  margin: 20px 0;\n  box-shadow: 0 4px 6px var(--shadow, rgba(0, 0, 0, 0.1));\n}\n\n.featured-article-title {\n  margin: 0 0 12px 0;\n  font-size: 1.5em;\n  font-weight: 700;\n  line-height: 1.3;\n}\n\n.featured-article-link {\n  color: white;\n  text-decoration: none;\n  border-bottom: 2px solid rgba(255, 255, 255, 0.3);\n  transition: border-bottom-color 0.2s ease;\n}\n.featured-article-link:hover {\n  border-bottom-color: rgba(255, 255, 255, 0.8);\n}\n\n.featured-article-excerpt {\n  margin: 0 0 16px 0;\n  font-size: 0.95em;\n  line-height: 1.6;\n  opacity: 0.95;\n}\n\n.featured-article-button {\n  display: inline-block;\n  padding: 10px 20px;\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n  text-decoration: none;\n  border-radius: 4px;\n  font-weight: 600;\n  transition: background-color 0.2s ease;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n}\n.featured-article-button:hover {\n  background: rgba(255, 255, 255, 0.3);\n  border-color: rgba(255, 255, 255, 0.5);\n}\n\n@media (max-width: 768px) {\n  .featured-article-content {\n    padding: 16px;\n    margin: 16px 0;\n  }\n  .featured-article-title {\n    font-size: 1.25em;\n  }\n  .featured-article-excerpt {\n    font-size: 0.9em;\n  }\n}";

// src/components/scripts/random-featured-article.inline.ts
var random_featured_article_inline_default = 'function T(t){let e=t|0;return()=>{e=e+1831565813|0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function A(t){let e=0;for(let n=0;n<t.length;n++)e=Math.imul(31,e)+t.charCodeAt(n)|0;return e}function C(t=new Date){return t.toISOString().slice(0,10)}function p(t){return t.endsWith("/")?t.slice(0,-1):t}function D(t,e){let n=p(t.toLowerCase());return e.some(i=>p(i.toLowerCase())===n)}function u(t){let e={"&":"&amp;","<":"&lt;",">":"&gt;",\'"\':"&quot;","\'":"&#039;"};return t.replace(/[&<>"\']/g,n=>e[n]||n)}function y(t,e){if(!t||t.length<=e)return t??"";let n=t.slice(0,e),i=n.lastIndexOf(" ");return`${(i>0?n.slice(0,i):n).trimEnd()}\\u2026`}function L(t){return t==="index"||t.endsWith("/index")}function S(t,e={}){return t.filter(n=>{let i=n.slug||"",l=n.title||"",r=n.tags||[];return!(!l||L(i)||e.requireTag&&!r.includes(e.requireTag)||e.excludeTag&&r.includes(e.excludeTag))})}function E(t,e){let n=T(A(e)),i=Math.floor(n()*t.length);return t[i]}function M(t,e,n,i){let l=y(e.description||e.content||"",n),r=e.slug||"",s=e.title||i;t.innerHTML=`\n    <div class="featured-article-content">\n      <h2 class="featured-article-title">\n        <a href="${r}" class="featured-article-link">${u(s)}</a>\n      </h2>\n      ${l?`<p class="featured-article-excerpt">${u(l)}</p>`:""}\n      <a href="${r}" class="featured-article-button">${u(i)} \\u2192</a>\n    </div>\n  `}async function v(){let t=document.getElementById("featured-article-init");if(!t)return;let e=t.getAttribute("data-page-title")||"",i=(t.getAttribute("data-activate-urls")||"").split("|").filter(o=>o.length>0),l=t.getAttribute("data-debug")==="true",r=t.getAttribute("data-require-tag")||void 0,s=t.getAttribute("data-exclude-tag")||void 0,w=Number(t.getAttribute("data-excerpt-length"))||280,x=t.getAttribute("data-read-more-label")||"Read More",g=t.getAttribute("data-no-articles-label")||"No featured articles available yet.",a=(...o)=>{l&&console.log("[RandomFeaturedArticle]",...o)};if(a("Checking activation",{title:document.title,url:window.location.href,pageTitle:e,activateUrls:i}),document.title!==e||!D(window.location.href,i)){a("Not on the configured page, skipping");return}let c=document.getElementById("featured-article");if(!c){a("Could not find #featured-article div - did you add it to your index page?");return}let f=window;if(!f.fetchData){a("window.fetchData is unavailable. Is the ContentIndex plugin (github:quartz-community/content-index) installed and enabled?"),c.innerHTML=`<p>${u(g)}</p>`;return}let h;try{h=await f.fetchData}catch(o){a("Failed to load contentIndex.json",o);return}let b=Object.values(h??{}),d=S(b,{requireTag:r,excludeTag:s});if(a("Eligible articles:",d.length,"of",b.length,"total"),d.length===0){c.innerHTML=`<p>${u(g)}</p>`;return}let m=E(d,C());a("Selected article",m),M(c,m,w,x)}document.addEventListener("nav",v);var $=window;$.addCleanup?.(()=>{document.removeEventListener("nav",v)});\n';
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
        "data-debug": debug ? "true" : "false",
        "data-read-more-label": "Read More"
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