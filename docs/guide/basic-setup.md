---
title: Basic Setup
description: A guide to setting up the VitePress Versioning Plugin.
---

# Basic Setup

This guide will walk you through setting up the VitePress Versioning Plugin in your VitePress project.

## Ensure All Links Are Relative

::: warning
This is extremely important! If you do not enforce relative links within your documentation project, versioned pages will not be able to link to each other!

If you have a project with many absolute links, consider writing a script to automate this.
:::

Before setting up the plugin, you will need to ensure that all links in your markdown files are relative. This is because the plugin uses the relative path of the file to determine which version of the file to link to.

This means that you should not use absolute links, such as `/guide/getting-started` but instead reference files based on their relative position to the file you are linking from.

- For example, if a file is located at `docs/guide/getting-started.md` and you want to link to `docs/guide/advanced-setup.md`, you should use the following link: `./advanced-setup.md`.

- For example, if a file is located at `docs/guide/getting-started.md` and you want to link to `docs/help/faq.md`, you should use the following link: `../help/faq.md`.

## Configuration Setup

Replace `defineConfig` in your `.vitepress/config.mts` with `defineVersionedConfig`, and you can add a `versioning` object to your config.

```ts
export default defineVersionedConfig({
  // ... your vitepress config.
  versioning: {
    latestVersion: "1.0.0",
  },
}, __dirname);
```

You can further configure this plugin by adding additional properties to the `versioning` object and within the `themeConfig` object. For a full list of configuration options, see the [Configuration Reference](/configuration/).

## Localization Setup

Whilst the plugin provides support for versioning, it automatically supports localization **only for pages.**

::: warning

**Sidebars and navbars are not automatically localized across versions.**

There are plans for a future release to provide a more streamlined solution for localized sidebars and navbars, however, this is an extremely complex problem that requires a lot of thought and consideration to provide a solution that works for everyone.
:::

Providing translations and versions for sidebars and navbars is complex, there isn't a one-size-fits-all solution. However, the plugin provides a number of configuration options to help you manage this complexity.

Consider taking a look at the following implementations to help you develop a system which can help you have versioned and localized sidebars:

- [Fabric Documentation](https://github.com/FabricMC/fabric-docs/blob/main/.vitepress/i18n.ts)
- [This Documentation Site!](https://github.com/IMB11/vitepress-versioning-plugin/blob/master/.vitepress/generateLocales.mts)