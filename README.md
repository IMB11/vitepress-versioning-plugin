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

To add a version, simply add `/versions/<version>` to your docs directory and copy the old content into that folder.

To add a sidebar for that version, add a `sidebar.json` file to the version folder. See the example in `test-docs` for an example that stores versioned sidebars in the `.vitepress` folder.

## Configuration

| Property                                   | Description                                                                      | Default Value                                                        |
| ------------------------------------------ | -------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `versioning.latestVersion`                 | The latest (current/root) version of the project.                                | None                                                                 |
| `versioning.switcher.text`                 | The text to display on the version switcher button.                              | 'Switch Version'                                                     |
| `versioning.switcher.includeLatestVersion` | Should the latest (root) version be included in the version switcher?            | `true`                                                               |
| `versioning.sidebars.processSidebarURLs`   | Whether or not to process sidebar URLs. Uses the `sidebarUrlProcessor` function. | `true`                                                               |
| `versioning.sidebars.sidebarPathResolver`  | The function that resolves the path to the sidebar file for a given version.     | `(version) => /versions/${version}/sidebar.json`                     |
| `versioning.sidebars.sidebarUrlProcessor`  | The function that processes sidebar URLs.                                        | `(url, version) => /${version}${url}`                                |
| `versioning.rewrites.rewriteProcessor`     | The function that processes rewrite URLs.                                        | `(inputFilePath, version) => inputFilePath.replace('versions/', '')` |
