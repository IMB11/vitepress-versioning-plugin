# `vitepress-versioning-plugin`

This plugin adds versioning support to VitePress.

## Installation

```sh
pnpm install vitepress-versioning-plugin
```

## Usage

Replace `defineConfig` in your `.vitepress/config.mts` with `defineVersionedConfig`, and you can add a `versioning` object to your config.

```ts
export default defineVersionedConfig({
  // ... your vitepress config.
  versioning: {
    latestVersion: "1.0.0",
  },
}, __dirname);
```

### Adding a Version

To add a version, simply add a directory to the `versions` folder in the root of your vitepress site.

To add a sidebar, put your sidebar into `.vitepress/sidebars/versioned/{version}.json`, or where specified by the `sidebarPathResolver` function.

If you have locales in the version, localized sidebars can be found at `.vitepress/sidebars/versioned/{version}-{locale}.json`, or where specified by the `sidebarPathResolver` function.

## Configuration

| Property                                           | Description                                                                      | Default Value                                                                                                                                     |
| -------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `themeConfig.sidebar.process`                      |                                                                                  | `true`                                                                                                                                            |
| `themeConfig.versionSwitcher.text`                 | The text to display on the version switcher button.                              | "Switch Version"                                                                                                                                  |
| `themeConfig.versionSwitcher.includeLatestVersion` | Should the latest (root) version be included in the version switcher?            | `true`                                                                                                                                            |
| `versioning.latestVersion`                         | A string representation of the latest version of the project (root).             | `null`                                                                                                                                            |
| `versioning.sidebars.processSidebarURLs`           | Whether or not to process sidebar URLs. Uses the `sidebarUrlProcessor` function. | `true`                                                                                                                                            |
| `versioning.sidebars.sidebarPathResolver`          | The function that resolves the path to the sidebar file for a given version.     | ``(version: Version) => `.vitepress/sidebars/versioned/${version}.json```                                                                         |
| `versioning.sidebars.sidebarUrlProcessor`          | The function that processes sidebar URLs.                                        | ``(url: string, version: Version) => `/${version}${url}```                                                                                        |
| `versioning.rewrites.localePrefix`                 | The prefix to add to the locale folders.                                         | `""`                                                                                                                                              |
| `versioning.rewrites.localeRewriteProcessor`       | The function that processes rewrite URLs for locale folders.                     | ``(inputFilePath: string, _version: Version, locale: string) => `${locale}/` + inputFilePath.replace("versions/", "").replace(`${locale}/`, "")`` |
| `versioning.rewrites.rewriteProcessor`             | The function that processes rewrite URLs.                                        | ``(inputFilePath: string, _version: Version) => inputFilePath.replace("versions/", "")``                                                          |

## Troubleshooting

### "The sidebar cannot be an array. Please use a DefaultTheme.MultiSidebar object where the root ('/') is your array."

This occurs when you have a sidebar that is an array, such as the following:

```ts
sidebar: [
  {
    text: '1.0.0',
    link: '/',
  },
],
```

Instead, you should have a sidebar object that looks like the following:

```ts
sidebar: {
  '/': [
    {
      text: '1.0.0',
      link: '/',
    },
  ],
},
```

This is because the sidebar object is expected to be a `DefaultTheme.MultiSidebar` object, where the root (`'/'`) is the array of sidebar items.

I will not be developing an automatic migration from the array sidebar to the object sidebar, as this is a breaking change and should be done manually by developers.

### "Versioned sidebar preperation failed, disabling versioning."

Please open an issue and provide a link to your documentation repository. This error occurs when the plugin is unable to find the sidebar for a version. This could be due to the sidebar not existing, or the sidebar being an array instead of an object.
