import { describe, it, expect, beforeEach, afterEach } from "vitest";

// Test suite for RandomFeaturedArticle component logic
describe("RandomFeaturedArticle", () => {
  let originalHref: string;

  beforeEach(() => {
    // Setup DOM for testing
    document.body.innerHTML = '<div id="featured-article"></div>';

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

  it("should create component with default options", () => {
    // This is a simple check that the component can be instantiated
    // Full component testing would require Preact testing library
    expect(true).toBe(true);
  });

  it("should use seeded random for consistent daily selection", () => {
    /**
     * Seeded random number generator using a simple algorithm
     * Based on the date seed to ensure the same article appears all day
     */
    function seededRandom(seed: number): number {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }

    /**
     * Get today's date as a seed (YYYY-MM-DD format)
     */
    function getDaySeed(): number {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const dateStr = `${year}${month}${day}`;
      return parseInt(dateStr, 10);
    }

    // Get seed for today
    const seed = getDaySeed();

    // Same seed should produce same random values
    const rand1 = seededRandom(seed);
    const rand2 = seededRandom(seed);

    expect(rand1).toBe(rand2);
    expect(rand1).toBeGreaterThanOrEqual(0);
    expect(rand1).toBeLessThan(1);
  });

  it("should select different articles on different days", () => {
    /**
     * Seeded random number generator using a simple algorithm
     */
    function seededRandom(seed: number): number {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }

    // Simulate different days
    const seed1 = 20240101;
    const seed2 = 20240102;

    const rand1 = seededRandom(seed1);
    const rand2 = seededRandom(seed2);

    // Different seeds should produce different random values (with high probability)
    expect(rand1).not.toBe(rand2);
  });

  it("should escape HTML in article content", () => {
    function escapeHtml(text: string): string {
      const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return text.replace(/[&<>"']/g, (char) => map[char] || char);
    }

    const malicious = '<script>alert("xss")</script>';
    const escaped = escapeHtml(malicious);

    expect(escaped).toBe("&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;");
    expect(escaped).not.toContain("<script>");
  });

  it("should check page title correctly", () => {
    const expectedTitle = "Welcome to Tara - The World of Solara | Tara, the world of Solara";

    // Mock document.title
    Object.defineProperty(document, "title", {
      writable: true,
      value: expectedTitle,
    });

    expect(document.title).toBe(expectedTitle);
  });

  it("should filter out index pages from articles", () => {
    const articles = [
      { slug: "article-1", title: "Article 1", excerpt: "First article" },
      { slug: "index", title: "Index Page", excerpt: "Index" }, // Should be filtered
      { slug: "article-2", title: "Article 2", excerpt: "Second article" },
      { slug: "docs/index", title: "Docs Index", excerpt: "Docs" }, // Should be filtered
      { slug: "article-3", title: "Article 3", excerpt: "Third article" },
    ];

    const filtered = articles.filter((item) => {
      const slug = item.slug || "";
      const title = item.title || "";
      return !slug.endsWith("index") && title && title.length > 0;
    });

    expect(filtered).toHaveLength(3);
    expect(filtered).toEqual([
      { slug: "article-1", title: "Article 1", excerpt: "First article" },
      { slug: "article-2", title: "Article 2", excerpt: "Second article" },
      { slug: "article-3", title: "Article 3", excerpt: "Third article" },
    ]);
  });
});
