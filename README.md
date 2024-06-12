# vitepress-versioning-plugin

This plugin adds versioning support to VitePress.

## Installation

```bash
pnpm install vitepress-versioning-plugin
```

## Usage

Replace `defineConfig` in your `.vitepress/config.mts` with `defineVersionedConfig` and add a `versioning` object to your config.

This `versioning` object should contain a `latestVersion` property, which is the name of the latest version (When no version is specified in the URL, eg: `/`).

```ts
export default defineVersionedConfig(__dirname, {
  // ... your vitepress config.
  versioning: {
    latestVersion: "1.0.0",
  },
});
```

## Adding Versions

To add a version, simply add a directory to the `versions` folder in the root of your vitepress site. 

To add a sidebar, put your sidebar into `.vitepress/sidebars/versioned/{version}.json` (or where specified by the `sidebarPathResolver` function).

If you have locales in the version, localized sidebars can be found at `.vitepress/sidebars/versioned/{version}-{locale}.json`, or where specified by the `sidebarPathResolver` function.

## Configuration

| Property                                     | Description                                                                      | Default Value                                                                                                         |
| -------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `versioning.latestVersion`                   | The latest (current/root) version of the project.                                | None                                                                                                                  |
| `versioning.switcher.text`                   | The text to display on the version switcher button.                              | 'Switch Version'                                                                                                      |
| `versioning.switcher.includeLatestVersion`   | Should the latest (root) version be included in the version switcher?            | `true`                                                                                                                |
| `versioning.sidebars.processSidebarURLs`     | Whether or not to process sidebar URLs. Uses the `sidebarUrlProcessor` function. | `true`                                                                                                                |
| `versioning.sidebars.sidebarPathResolver`    | The function that resolves the path to the sidebar file for a given version.     | `(version) => '.vitepress/sidebars/versioned/${version}.json'`                                                        |
| `versioning.sidebars.sidebarUrlProcessor`    | The function that processes sidebar URLs.                                        | `(url, version) => '/${version}${url}'`                                                                               |
| `versioning.rewrites.rewriteProcessor`       | The function that processes rewrite URLs.                                        | `(inputFilePath, version) => inputFilePath.replace('versions/', '')`                                                  |
| `versioning.rewrites.localeRewriteProcessor` | The function that processes rewrite URLs for localized versions.                 | `(inputFilePath, version, locale) => '${locale}/' + inputFilePath.replace('versions/', '').replace('${locale}/', '')` |

## Troubleshooting

#### "The sidebar cannot be an array. Please use a DefaultTheme.MultiSidebar object where the root ('/') is your array."

This occurs when you have a sidebar that is an array, such as the following:

```ts
  sidebar: [
        {
          text: '1.0.0',
          link: '/'
        }
  ],
```

Instead, you should have a sidebar object that looks like the following:

```ts
  sidebar: {
    '/': [
      {
        text: '1.0.0',
        link: '/'
      }
    ]
  },
```

This is because the sidebar object is expected to be a `DefaultTheme.MultiSidebar` object, where the root (`'/'`) is the array of sidebar items.

I will not be developing an automatic migration from the array sidebar to the object sidebar, as this is a breaking change and should be done manually by developers.

#### "Versioned sidebar preperation failed, disabling sidebar versioning."

Please open an issue and provide a link to your documentation repository. This error occurs when the plugin is unable to find the sidebar for a version. This could be due to the sidebar not existing, or the sidebar being an array instead of an object.

