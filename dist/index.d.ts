import { QuartzComponent } from '@quartz-community/types';

interface RandomFeaturedArticleOptions {
    /** The expected page title to activate on */
    pageTitle?: string;
    /** The expected URLs to activate on (can include multiple variants) */
    activateUrls?: string[];
    /** Enable debug logging to console */
    debug?: boolean;
}
declare const _default: (opts?: RandomFeaturedArticleOptions) => QuartzComponent;

export { _default as RandomFeaturedArticle, type RandomFeaturedArticleOptions };
