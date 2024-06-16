---
title: Basic Setup
description: A guide to setting up the VitePress Versioning Plugin.
---

# Basic Setup

This guide will walk you through setting up the VitePress Versioning Plugin in your VitePress project.

## Ensure All Links Are Relative

::: warning
This is extremely important! If you do not enforce relative links within your documentation project, versioned pages will not be able to link to eachother!

If you have a project with many absolute links, consider using a tool like [SED to automatically convert them to relative links.](https://stackoverflow.com/questions/69522697/sed-to-convert-absolute-to-relative-link-in-markdown-file)
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