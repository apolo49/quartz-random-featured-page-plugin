import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types";
import style from "./styles/random-featured-article.scss";
// @ts-expect-error - inline script import handled by Quartz bundler
import script from "./scripts/random-featured-article.inline.ts";

export interface RandomFeaturedArticleOptions {
  /** The expected page title to activate on */
  pageTitle?: string;
  /** The expected URLs to activate on (can include multiple variants) */
  activateUrls?: string[];
  /** Enable debug logging to console */
  debug?: boolean;
}

export default ((opts?: RandomFeaturedArticleOptions) => {
  const defaultUrls = [
    "https://apolo49.github.io/before-the-start-dnd-campaign-notes/",
    "https://apolo49.github.io/before-the-start-dnd-campaign-notes/index",
  ];

  const {
    pageTitle = "Welcome to Tara - The World of Solara | Tara, the world of Solara",
    activateUrls = defaultUrls,
    debug = false,
  } = opts ?? {};

  const Component: QuartzComponent = (_props: QuartzComponentProps) => {
    // Render a placeholder that can be targeted by the inline script
    // Embed config data as attributes for the script to read
    return (
      <div
        id="featured-article-init"
        data-page-title={pageTitle}
        data-activate-urls={activateUrls.join("|")}
        data-debug={debug ? "true" : "false"}
        data-read-more-label="Read More"
      ></div>
    );
  };

  Component.css = style;
  Component.afterDOMLoaded = script;

  return Component;
}) satisfies QuartzComponentConstructor;
