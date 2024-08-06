import { Versioned } from "./types";

const defaultThemeConfig: Versioned.ThemeConfig = {
  versionSwitcher: {
    text: "Switch Version",
    includeLatestVersion: true,
  },
};

const defaultConfig: Versioned.Config = {
  versioning: {
    latestVersion: null,
    sidebars: {
      processSidebarURLs: true,
      sidebarPathResolver: (version: Versioned.Version) =>
        `.vitepress/sidebars/versioned/${version}.json`,
      sidebarUrlProcessor: (url: string, version: Versioned.Version) =>
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
        _version: Versioned.Version,
        locale: string
      ) =>
        `${locale}/` +
        inputFilePath.replace("versions/", "").replace(`${locale}/`, ""),
      rewriteProcessor: (inputFilePath: string, _version: Versioned.Version) =>
        inputFilePath.replace("versions/", ""),
    },
  },
};

export { defaultConfig, defaultThemeConfig };