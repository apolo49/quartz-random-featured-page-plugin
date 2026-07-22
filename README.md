# Quartz Random Featured Article Plugin

A Quartz v5 component plugin that displays a random featured article on your site, changing daily based on a seeded random number generator. Similar to Wikipedia's featured article of the day.

## Features

- ✅ **UTC-synchronized daily rotation**: Every visitor sees the same featured article for a calendar day (rotates at midnight UTC)
- ✅ **Seeded RNG**: Uses a fast deterministic algorithm to pick consistently from the article pool
- ✅ **Automatic filtering**: Excludes index pages, untitled entries, and supports opt-out tags
- ✅ **Page-specific activation**: Fires only on configured page titles and URLs
- ✅ **XSS-safe rendering**: All content is escaped and sanitized
- ✅ **SPA-aware**: Properly handles Quartz's SPA navigation and cleanup
- ✅ **CSS variables**: Uses theme colors, respects dark mode
- ✅ **Comprehensive tests**: Unit tests for all core logic

## Getting started

```bash
npm install
npm run build
```

> [!important]
> After building, the `dist/` directory should be committed to the repository. It is not gitignored, as Quartz uses it for pre-built distribution.

## Build and Distribution

The template is configured to bundle all dependencies by default via `noExternal: [/.*/]` in `tsup.config.ts`. This ensures that users don't need to install any dependencies when using your plugin.

- **Singleton Externals**: Certain packages (`preact`, `vfile`, `unified`, `@jackyzha0/quartz`) are kept external to ensure only one instance of them exists across all plugins.
- **Native Dependencies**: If your plugin uses native dependencies (like `sharp`, `@napi-rs/simple-git`, etc.), you must exclude them from bundling. Use a regex pattern in `noExternal` to exclude them, for example: `noExternal: [/^(?!sharp)/]`.
- **CI Verification**: The included CI workflow verifies that `dist/` is up to date on every push.

## Usage in Quartz

First, ensure the [ContentIndex](https://github.com/quartz-community/content-index) plugin is installed, as this plugin depends on it to access the site's content index.

Install this plugin into your Quartz site:

```bash
npx quartz plugin add github:apolo49/quartz-random-featured-page-plugin
```

Register it in your `quartz.config.ts`:

```ts
import { RandomFeaturedArticle } from "./plugins/quartz-random-featured-page-plugin/dist/components/index";

export default {
  plugins: {
    transformers: [...],
    filters: [...],
    emitters: [...],
  },
  layout: {
    "en-US": {
      head: Head(),
      header: [],
      afterBody: [
        RandomFeaturedArticle({
          pageTitle: "Welcome to Tara - The World of Solara | Tara, the world of Solara",
          activateUrls: [
            "https://apolo49.github.io/before-the-start-dnd-campaign-notes/",
            "https://apolo49.github.io/before-the-start-dnd-campaign-notes/index",
          ],
          debug: false,
        }),
      ],
      left: [...],
      right: [...],
      footer: Footer(),
    },
  },
};
```

Add this div to your index page template (typically in `quartz/components/pages/index.tsx` or your custom layout component) where you want the featured article to appear:

```html
<div id="featured-article"></div>
```

## Configuration

### `RandomFeaturedArticle(options)`

| Option         | Type       | Default                                                              | Description                                                  |
| -------------- | ---------- | -------------------------------------------------------------------- | ------------------------------------------------------------ |
| `pageTitle`    | `string`   | `"Welcome to Tara - The World of Solara\|Tara, the world of Solara"` | The exact page title to activate on (case-sensitive)         |
| `activateUrls` | `string[]` | User's configured campaign site URLs                                 | URLs where the plugin activates (case-insensitive)           |
| `debug`        | `boolean`  | `false`                                                              | Enable console logging for debugging; output goes to browser |
| `requireTag`   | `string?`  | undefined                                                            | Only feature articles with this frontmatter tag              |
| `excludeTag`   | `string?`  | undefined                                                            | Skip articles with this frontmatter tag                      |

## How It Works

1. On page load, the plugin checks if the current page title and URL match the configured values
2. If they match, it retrieves the content index from Quartz
3. Uses today's date (YYYYMMDD) as a seed for a seeded random number generator
4. Selects an article at a consistent index based on that seed
5. Displays the article with title, excerpt, and a "Read More" link in a styled card

Every day, a different article will be featured, and it will remain the same article all day long.

## Development

```bash
npm install
npm run build       # Build the plugin
npm run dev         # Watch mode
npm test            # Run tests
npm run check       # Typecheck, lint, format, and test
```

## Publishing

Tags matching `v*` trigger the GitHub Actions publish workflow. Ensure `NPM_TOKEN` is set in the
repository secrets.

## License

MIT
