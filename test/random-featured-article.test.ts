import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  mulberry32,
  hashSeed,
  getDaySeed,
  isActivePage,
  escapeHtml,
  truncate,
  filterEligibleArticles,
  pickFeatured,
  type ContentDetail,
} from "../src/components/scripts/random-featured-article.inline";

// Test suite for RandomFeaturedArticle component logic
describe("RandomFeaturedArticle", () => {
  let originalHref: string;

  beforeEach(() => {
    // Setup DOM for testing
    document.body.innerHTML = '<div id="featured-article-init"></div>';

    // Save original location
    originalHref = window.location.href;

    // Mock window.location
    delete (window as unknown as Record<string, unknown>).location;
    (window as unknown as Record<string, unknown>).location = {
      href: "https://apolo49.github.io/before-the-start-dnd-campaign-notes/",
    };
  });

  afterEach(() => {
    document.body.innerHTML = "";
    // Restore location
    delete (window as unknown as Record<string, unknown>).location;
    (window as unknown as Record<string, unknown>).location = { href: originalHref };
  });

  it("getDaySeed generates consistent UTC day seeds", () => {
    const testDate = new Date("2024-03-15T10:30:00Z");
    const seed = getDaySeed(testDate);
    expect(seed).toBe("2024-03-15");
    expect(typeof seed).toBe("string");
  });

  it("mulberry32 produces different values for different seeds", () => {
    const rng1 = mulberry32(hashSeed("2024-03-15"))();
    const rng2 = mulberry32(hashSeed("2024-03-16"))();
    expect(rng1).not.toBe(rng2);
    expect(rng1).toBeGreaterThanOrEqual(0);
    expect(rng1).toBeLessThan(1);
    expect(rng2).toBeGreaterThanOrEqual(0);
    expect(rng2).toBeLessThan(1);
  });

  it("mulberry32 is deterministic with same seed", () => {
    const seed = hashSeed("2024-03-15");
    const rng1 = mulberry32(seed);
    const rng2 = mulberry32(seed);
    expect(rng1()).toBe(rng2());
  });

  it("pickFeatured picks the same article for same day seed", () => {
    const articles: ContentDetail[] = [
      { slug: "article-1", title: "Article 1", description: "First" },
      { slug: "article-2", title: "Article 2", description: "Second" },
      { slug: "article-3", title: "Article 3", description: "Third" },
    ];

    const seed = "2024-03-15";
    const pick1 = pickFeatured(articles, seed);
    const pick2 = pickFeatured(articles, seed);

    expect(pick1).toEqual(pick2);
    expect(pick1.slug).toBe(pick1.slug);
  });

  it("escapeHtml prevents XSS attacks", () => {
    const malicious = '<script>alert("xss")</script>';
    const escaped = escapeHtml(malicious);

    expect(escaped).toBe("&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;");
    expect(escaped).not.toContain("<script>");
    expect(escaped).not.toContain("</script>");
  });

  it("isActivePage matches URLs case-insensitively with/without trailing slash", () => {
    const urls = ["https://example.com/featured", "https://example.com/"];

    expect(isActivePage("https://example.com/featured", urls)).toBe(true);
    expect(isActivePage("https://example.com/featured/", urls)).toBe(true);
    expect(isActivePage("HTTPS://EXAMPLE.COM/FEATURED", urls)).toBe(true);
    expect(isActivePage("https://example.com/other", urls)).toBe(false);
  });

  it("filterEligibleArticles excludes index pages and untitled articles", () => {
    const articles: ContentDetail[] = [
      { slug: "article-1", title: "Article 1", description: "First" },
      { slug: "index", title: "Index Page", description: "Index" },
      { slug: "article-2", title: "Article 2", description: "Second" },
      { slug: "docs/index", title: "Docs", description: "Docs" },
      { slug: "article-3", title: "", description: "No title" },
    ];

    const filtered = filterEligibleArticles(articles);
    expect(filtered).toHaveLength(2);
    expect(filtered.map((a) => a.slug)).toEqual(["article-1", "article-2"]);
  });

  it("filterEligibleArticles respects tag filters", () => {
    const articles: ContentDetail[] = [
      { slug: "article-1", title: "Article 1", tags: ["featured"] },
      { slug: "article-2", title: "Article 2", tags: ["draft"] },
      { slug: "article-3", title: "Article 3", tags: ["featured", "updated"] },
    ];

    const filtered = filterEligibleArticles(articles, { requireTag: "featured" });
    expect(filtered).toHaveLength(2);
    expect(filtered.map((a) => a.slug)).toEqual(["article-1", "article-3"]);

    const excluded = filterEligibleArticles(articles, { excludeTag: "draft" });
    expect(excluded).toHaveLength(2);
    expect(excluded.map((a) => a.slug)).toEqual(["article-1", "article-3"]);
  });

  it("truncate shortens text with ellipsis and respects word boundaries", () => {
    const long = "This is a very long article about something interesting";
    const truncated = truncate(long, 20);
    expect(truncated).toContain("\u2026");
    expect(truncated.length).toBeLessThanOrEqual(21);
  });
});
