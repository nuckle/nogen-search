# NoGen Search

![no-gen-search](img/brand.png)

## About

A browser extension that helps to filter AI-generated content from popular
search engines like Google, Bing, and DuckDuckGo. It also provides some options
to disable certain AI features on these platforms.

## Features

- Filter search results based on a specified date range
- Predefined date filtering presets for the years 2023 and 2022
- Search engine-specific settings (disabling Google Overview, DuckDuckGo AI chat, and others)
- Exclude specific websites from your search query
- Lightweight and fast

## Permissions

- `cookies`: To modify cookies in cases when it's the only way to disable a certain feature (for instance, Bing uses them to store an
  information about copilot status)
- `scripting`: Inject JavaScript into web pages to hide elements, such as Google's Overview, from the page source code
- `tabs`: For JavaScript injection and modify query parameters on browsers that use ManifestV3
- `webRequest` and `webRequestBlocking`: Monitor and modify URLs when needed
- `declarativeNetRequest`: Used in ManifestV3 for creating network rules
- `storage`: Save and retrieve user preferences and settings


## Download

| Firefox | Chrome |
|---------|--------|
| <p align="center"><a href="https://addons.mozilla.org/en-US/firefox/addon/nogen-search/"><img src="img/firefox.png"></a></p> | <p align="center"><a href="https://chromewebstore.google.com/detail/nogen-search/idldfepeepcikagaiephoomiljfgjald"><img src="img/chrome.png"></a></p> |
| [Download](https://addons.mozilla.org/en-US/firefox/addon/nogen-search/) | [Download](https://chromewebstore.google.com/detail/nogen-search/idldfepeepcikagaiephoomiljfgjald) |

Or on a [release page](https://github.com/nuckle/nogen-search/releases/latest)

## Resources

Huge thanks to [Nicholas Taylor](https://nullhandle.org/) for [his article about Bing Date Search Operators](https://nullhandle.org/blog/2024-06-12-exploring-the-bing-date-search-operators.html). It wasn't obvious to figure out how they work 😅

And thanks to [Zach](https://github.com/zbarnz)! [Google AI Overviews Blocker](https://github.com/zbarnz/Google_AI_Overviews_Blocker) was an inspiration for this project

## Usage Notes

The extension manifest is defined in `src/manifest.js` and used by
`@samrum/vite-plugin-web-extension` in the vite config.

Background, content scripts, options, and popup entry points exist in the
`src/entries` directory.

Content scripts are rendered by `src/entries/contentScript/renderContent.js`
which renders content within a ShadowRoot and handles style injection for HMR
and build modes.

Otherwise, the project functions just like a regular Vite project.

To switch between Manifest V2 and Manifest V3 builds, use the `MANIFEST_VERSION`
environment variable defined in `.env`

HMR during development in Manifest V3 requires Chromium version >= 110.0.5480.0.

Refer to
[@samrum/vite-plugin-web-extension](https://github.com/samrum/vite-plugin-web-extension)
for more usage notes.

## Project Setup

```sh
npm install
```

You can customize your build via `.env` file

```conf
MANIFEST_VERSION=3
FIREFOX_BUILD=0
```

- `MANIFEST_VERSION` - manifest version you want to use (`2` or `3`)
- `FIREFOX_BUILD` - is the build for Firefox (`0` - no, `1` - yes)

## Project Setup

```sh
npm install
```

## Commands

### Build

#### Development, HMR

Hot Module Reloading is used to load changes inline without requiring extension
rebuilds and extension/page reloads Currently only works in Chromium based
browsers.

```sh
npm run dev
```

#### Development, Watch

Rebuilds extension on file changes. Requires a reload of the extension (and page
reload if using content scripts)

```sh
npm run watch
```

#### Production

Minifies and optimizes extension build

```sh
npm run build
```

### Load extension in browser

Loads the contents of the dist directory into the specified browser

```sh
npm run serve:chrome
```

```sh
npm run serve:firefox
```

## License

[GPLv3](LICENSE).
