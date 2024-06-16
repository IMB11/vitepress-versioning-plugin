import { Version, VersionedConfig, VersionedThemeConfig } from "./types";

const defaultThemeConfig: VersionedThemeConfig = {
  versionSwitcher: {
    text: "Switch Version",
    includeLatestVersion: true,
  },
};

const defaultConfig: VersionedConfig = {
  versioning: {
    latestVersion: null,
    sidebars: {
      processSidebarURLs: true,
      sidebarPathResolver: (version: Version) =>
        `.vitepress/sidebars/versioned/${version}.json`,
      sidebarUrlProcessor: (url: string, version: Version) =>
        `/${version}${url}`,
    },
    // navbars: {
    //   processNavbarURLs: true,
    //   navbarUrlProcessor: (url: string, version: Version) =>
    //     `/${version}${url}`,
    //   navbarPathResolver: (version: Version) =>
    //     `.vitepress/navbars/versioned/${version}.json`,
    // },
    rewrites: {
      localePrefix: "",
      localeRewriteProcessor: (
        inputFilePath: string,
        _version: Version,
        locale: string
      ) =>
        `${locale}/` +
        inputFilePath.replace("versions/", "").replace(`${locale}/`, ""),
      rewriteProcessor: (inputFilePath: string, _version: Version) =>
        inputFilePath.replace("versions/", ""),
    },
  },
};

export { defaultConfig, defaultThemeConfig };