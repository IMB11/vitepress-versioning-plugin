---
title: Troubleshooting
description: Troubleshooting guide for common issues with the versioning plugin.
---

# Troubleshooting

## "The sidebar cannot be an array. Please use a DefaultTheme.MultiSidebar object where the root ('/') is your array."

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

## "Versioned sidebar preperation failed, disabling versioning."

Please open an issue and provide a link to your documentation repository. This error occurs when the plugin is unable to find the sidebar for a version. This could be due to the sidebar not existing, or the sidebar being an array instead of an object.
