---
title: Configuration Reference
description: A reference for the Vitepress Versioning Plugin configuration options.
outline: none
layout: home
---

<br />

# Configuration Reference

These configuration values are for the latest version. If you are using an older version of the plugin, switch version in the navbar.

- `themeConfig.` refers to values which are part of the VitePress theme configuration, within the `themeConfig` block, these configuration values can also exist per-locale given that you use a custom theme configuration for each locale.
- `versioning.` refers to values which are part of the VitePress Versioning Plugin configuration, these apply across all locales and versions.

| Property                                           | Description                                                                                                | Default Value                                                                                                                                     |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `themeConfig.sidebar.process`                      | Should the plugin should process sidebar links according to the `versioning.sidebars` processor functions? | `true`                                                                                                                                            |
| `themeConfig.versionSwitcher.text`                 | The text to display on the version switcher button.                                                        | "Switch Version"                                                                                                                                  |
| `themeConfig.versionSwitcher.includeLatestVersion` | Should the latest (root) version be included in the version switcher?                                      | `true`                                                                                                                                            |
| `versioning.latestVersion`                         | A string representation of the latest version of the project (root).                                       | `null`                                                                                                                                            |
| `versioning.sidebars.processSidebarURLs`           | Whether or not to process sidebar URLs. Uses the `sidebarUrlProcessor` function.                           | `true`                                                                                                                                            |
| `versioning.sidebars.sidebarPathResolver`          | The function that resolves the path to the sidebar file for a given version.                               | ``(version: Version) => `.vitepress/sidebars/versioned/${version}.json` ``                                                                        |
| `versioning.sidebars.sidebarUrlProcessor`          | The function that processes sidebar URLs.                                                                  | ``(url: string, version: Version) => `/${version}${url}` ``                                                                                       |
| `versioning.rewrites.localePrefix`                 | The prefix to add to the locale folders.                                                                   | `""`                                                                                                                                              |
| `versioning.rewrites.localeRewriteProcessor`       | The function that processes rewrite URLs for locale folders.                                               | ``(inputFilePath: string, _version: Version, locale: string) => `${locale}/` + inputFilePath.replace("versions/", "").replace(`${locale}/`, "")`` |
| `versioning.rewrites.rewriteProcessor`             | The function that processes rewrite URLs.                                                                  | ``(inputFilePath: string, _version: Version) => inputFilePath.replace("versions/", "")``                                                          |