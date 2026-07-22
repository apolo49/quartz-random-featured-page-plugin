// ============================================================================
// Random Featured Article Plugin - Client-Side Logic
// ============================================================================
// This script selects a featured article from the site index each day
// using a seeded random number generator based on the current date.
// Similar to Wikipedia's featured article of the day.
// ============================================================================
/* eslint-disable no-restricted-syntax */

// @ts-nocheck
// ============================================================================
// Random Featured Article Plugin - Client-Side Logic
// ============================================================================
// Picks a featured article from Quartz's own contentIndex.json each day,
// using the current UTC date as a seed for a deterministic PRNG. Similar to
// Wikipedia's "Today's Featured Article".
//
// IMPORTANT: this file is compiled ONCE, at *plugin* build time (see
// tsup.config.ts's inline-script-loader), into a static browser script that
// ships inside dist/. It can't read per-site config directly - config comes
// in via data-* attributes on the #featured-article-init marker element that
// RandomFeaturedArticle.tsx renders at *site* build time instead.
//
// `export` on the pure helper functions below is intentional and safe: the
// build's inline-script-loader strips `export`/`export default` from the
// start of each line before bundling for the browser (see tsup.config.ts),
// so these exports only exist for the benefit of the vitest test suite,
// which imports this file directly (see AGENTS.md's testing patterns).
// ============================================================================
/* eslint-disable no-restricted-syntax */

export interface ContentDetail {
  slug: string;
  title: string;
  tags?: string[];
  content?: string;
  description?: string;
}

// contentIndex.json is emitted by the (separately installed) ContentIndex
// plugin as a Record<slug, ContentDetail> - NOT an array. `fetchData` is the
// documented way to access it client-side with the site's base path handled
// correctly for you; see the Quartz v5 -> standalone plugin migration guide:
// https://github.com/quartz-community/stacked-pages
// "Use the fetchData global to access contentIndex.json with the correct base path"
interface QuartzWindow extends Window {
  fetchData?: Promise<Record<string, ContentDetail>>;
  addCleanup?: (fn: () => void) => void;
}

/**
 * mulberry32: small, fast, seeded PRNG -> deterministic [0, 1) stream.
 * Used instead of the classic `Math.sin(seed) * 10000` trick, which produces
 * visibly correlated output for sequential integer seeds - exactly what
 * consecutive day-over-day date seeds are.
 */
export function mulberry32(seed: number): () => number {
  let state = seed | 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic string -> 32-bit int hash. */
export function hashSeed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

/**
 * Today's date as YYYY-MM-DD in UTC (not local time!). Using UTC means every
 * visitor, in any timezone, sees the same featured article on a given
 * calendar day, and it rotates for everyone at the same instant - matching
 * how Wikipedia's Main Page TFA behaves globally. The previous local-time
 * version would flip at each visitor's own midnight, so two people reading
 * at the same moment in different timezones could see different articles.
 */
export function getDaySeed(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

/** Check if current URL matches any of the activation URLs, ignoring a trailing slash on either side. */
export function isActivePage(currentUrl: string, activateUrls: string[]): boolean {
  const url = stripTrailingSlash(currentUrl.toLowerCase());
  return activateUrls.some((activateUrl) => stripTrailingSlash(activateUrl.toLowerCase()) === url);
}

/** Escape HTML special characters to prevent XSS. */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}

/** Truncate to a max length on a word boundary, with an ellipsis. */
export function truncate(text: string, max: number): string {
  if (!text || text.length <= max) return text ?? "";
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}\u2026`;
}

/**
 * A page counts as an "index" page (folder listing or site root) if its slug
 * is exactly "index" or ends in "/index" - matching Quartz's own
 * simplifySlug convention. A loose `.endsWith("index")` substring check (the
 * previous implementation) would wrongly exclude a real page like
 * "world/reindex" or "codex".
 */
function isIndexSlug(slug: string): boolean {
  return slug === "index" || slug.endsWith("/index");
}

export function filterEligibleArticles(
  entries: ContentDetail[],
  opts: { requireTag?: string; excludeTag?: string } = {},
): ContentDetail[] {
  return entries.filter((item) => {
    const slug = item.slug || "";
    const title = item.title || "";
    const tags = item.tags || [];
    if (!title || isIndexSlug(slug)) return false;
    if (opts.requireTag && !tags.includes(opts.requireTag)) return false;
    if (opts.excludeTag && tags.includes(opts.excludeTag)) return false;
    return true;
  });
}

export function pickFeatured<T>(articles: T[], seedStr: string): T {
  const rng = mulberry32(hashSeed(seedStr));
  const idx = Math.floor(rng() * articles.length);
  return articles[idx];
}

function renderFeatured(
  featuredDiv: HTMLElement,
  article: ContentDetail,
  excerptLength: number,
  readMoreLabel: string,
): void {
  const excerpt = truncate(article.description || article.content || "", excerptLength);
  const slug = article.slug || "";
  const title = article.title || readMoreLabel;

  featuredDiv.innerHTML = `
    <div class="featured-article-content">
      <h2 class="featured-article-title">
        <a href="${slug}" class="featured-article-link">${escapeHtml(title)}</a>
      </h2>
      ${excerpt ? `<p class="featured-article-excerpt">${escapeHtml(excerpt)}</p>` : ""}
      <a href="${slug}" class="featured-article-button">${escapeHtml(readMoreLabel)} \u2192</a>
    </div>
  `;
}

/**
 * Main entry point. Exported (see note above `ContentDetail`) so tests can
 * call it directly against a mocked DOM + fetchData instead of duplicating
 * this logic.
 */
export async function populateFeaturedArticle(): Promise<void> {
  const initElement = document.getElementById("featured-article-init");
  if (!initElement) return;

  const pageTitle = initElement.getAttribute("data-page-title") || "";
  const activateUrlsStr = initElement.getAttribute("data-activate-urls") || "";
  const activateUrls = activateUrlsStr.split("|").filter((url) => url.length > 0);
  const debug = initElement.getAttribute("data-debug") === "true";
  const requireTag = initElement.getAttribute("data-require-tag") || undefined;
  const excludeTag = initElement.getAttribute("data-exclude-tag") || undefined;
  const excerptLength = Number(initElement.getAttribute("data-excerpt-length")) || 280;
  const readMoreLabel = initElement.getAttribute("data-read-more-label") || "Read More";
  const noArticlesLabel =
    initElement.getAttribute("data-no-articles-label") || "No featured articles available yet.";

  const log = (...args: unknown[]) => {
    if (debug) console.log("[RandomFeaturedArticle]", ...args);
  };

  log("Checking activation", {
    title: document.title,
    url: window.location.href,
    pageTitle,
    activateUrls,
  });

  if (document.title !== pageTitle || !isActivePage(window.location.href, activateUrls)) {
    log("Not on the configured page, skipping");
    return;
  }

  const featuredDiv = document.getElementById("featured-article");
  if (!featuredDiv) {
    log("Could not find #featured-article div - did you add it to your index page?");
    return;
  }

  const quartzWindow = window as QuartzWindow;
  if (!quartzWindow.fetchData) {
    log(
      "window.fetchData is unavailable. Is the ContentIndex plugin " +
        "(github:quartz-community/content-index) installed and enabled?",
    );
    featuredDiv.innerHTML = `<p>${escapeHtml(noArticlesLabel)}</p>`;
    return;
  }

  let index: Record<string, ContentDetail>;
  try {
    index = await quartzWindow.fetchData;
  } catch (err) {
    log("Failed to load contentIndex.json", err);
    return;
  }

  const entries = Object.values(index ?? {});
  const articles = filterEligibleArticles(entries, { requireTag, excludeTag });
  log("Eligible articles:", articles.length, "of", entries.length, "total");

  if (articles.length === 0) {
    featuredDiv.innerHTML = `<p>${escapeHtml(noArticlesLabel)}</p>`;
    return;
  }

  const featured = pickFeatured(articles, getDaySeed());
  log("Selected article", featured);
  renderFeatured(featuredDiv, featured, excerptLength, readMoreLabel);
}

// Quartz's SPA router fires "nav" after every navigation, INCLUDING the
// initial page load - so this one listener covers both cases. There's
// deliberately no extra unconditional call at module scope: the previous
// version had both, causing populateFeaturedArticle (and its fetch) to run
// twice on first load.
document.addEventListener("nav", populateFeaturedArticle);

const cleanupWindow = window as QuartzWindow;
cleanupWindow.addCleanup?.(() => {
  document.removeEventListener("nav", populateFeaturedArticle);
});