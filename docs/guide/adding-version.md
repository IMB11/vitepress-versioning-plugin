---
title: Adding a Version
description: A guide to adding a new version to your VitePress project.
---

# Adding a Version

Adding a new version to your VitePress project is simple.

## Step 1: Create a New Version Folder

Create a new folder in the `versions` directory in the root of your VitePress project. This folder should be named after the version you are adding.

## Step 2: Move All Content

Move all content from the root of your VitePress project into the new version folder. This includes all markdown files. 

Images and assets should stay within the `public` folder in the root of your project, as they are shared across all versions - if you need to version these files, simply change the path of these files to include the version or move them next to the markdown files they are used by and reference them relatively (e.g. `![image](./image.png)`).

## Step 3: Move any Localized Content

If you have translations for your pages, you should move them into the `versions/{version}/translated/{locale}` folder - if you have specified a prefix for this folder via the `versioning.rewrites.localePrefix` configuration, you should take this into account.

## Step 4: Create a Sidebar

Create a sidebar for your version. By default, this should be placed in the `.vitepress/sidebars/versioned/{version}.json` file, or where specified by the `sidebarPathResolver` function.

If you have locales in the version, localized sidebars can be found at `.vitepress/sidebars/versioned/{version}-{locale}.json`. The version will be replaced with the version number and the locale will be replaced with the locale code.