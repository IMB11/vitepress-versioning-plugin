import { VVP } from "./types";

const defaultThemeConfig: VVP.ThemeConfig = {
  versionSwitcher: {
    text: "Switch Version",
    includeLatestVersion: true,
  },
};

const defaultConfig: VVP.Config = {
  versioning: {
    latestVersion: null,
    sidebars: {
      processSidebarURLs: true,
      sidebarPathResolver: (version: VVP.Version) =>
        `.vitepress/sidebars/versioned/${version}.json`,
      sidebarUrlProcessor: (url: string, version: VVP.Version) =>
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
        _version: VVP.Version,
        locale: string
      ) =>
        `${locale}/` +
        inputFilePath.replace("versions/", "").replace(`${locale}/`, ""),
      rewriteProcessor: (inputFilePath: string, _version: VVP.Version) =>
        inputFilePath.replace("versions/", ""),
    },
  },
};

export { defaultConfig, defaultThemeConfig };