import { DefaultTheme, UserConfig } from "vitepress";

export namespace VVP {
  export type Version = string;

  export type SwitcherConfig = {
    /**
     * The text to display on the version switcher button.
     */
    text?: string;

    /**
     * Should the latest (root) version be included in the version switcher?
     */
    includeLatestVersion?: boolean;
  };

  export type RewritesConfig = {
    /**
     * The prefix to add to the locale folders.
     */
    localePrefix?: string;

    /**
     * The function that processes rewrite URLs for locale folders.
     * @param inputFilePath The input file path to process.
     * @param version The version to process the URL for.
     * @param locale The locale to process the URL for.
     * @returns The processed URL.
     * @default (inputFilePath: string, _version: Version, locale: string) => `${locale}/` + inputFilePath.replace("versions/", "").replace(`${locale}/`, "")
     */
    localeRewriteProcessor?: (
      inputFilePath: string,
      version: Version,
      locale: string
    ) => string;

    /**
     * The function that processes rewrite URLs.
     * @param inputFilePath The input file path to process.
     * @param version The version to process the URL for.
     * @returns The processed URL.
     * @default (inputFilePath: string, _version: Version) => inputFilePath.replace("versions/", "")
     * @example // Turns `/versions/1.0.0/index.md` into `/1.0.0/index.md`
     */
    rewriteProcessor?: (inputFilePath: string, version: Version) => string;
  };

  export type SidebarConfig = {
    /**
     * Whether or not to process sidebar URLs. Uses the `sidebarUrlProcessor` function.
     * @default true
     */
    processSidebarURLs?: boolean;

    /**
     * The function that resolves the path to the sidebar file for a given version.
     * @param version The version to resolve the sidebar path for.
     * @returns The path to the sidebar file for the given version.
     * @default (version: Version) => `.vitepress/sidebars/versioned/${version}.json`
     */
    sidebarPathResolver?: (version: Version) => string;

    /**
     * The function that processes sidebar URLs.
     * @param url The URL to process.
     * @param version The version to process the URL for.
     * @returns The processed URL.
     * @default (url: string, version: Version) => `/${version}${url}`
     */
    sidebarUrlProcessor?: (url: string, version: Version) => string;

    /**
     * Used to process the sidebar content further after versioning has been applied.
     * @param sidebar Sidebar input.
     * @returns Processed sidebar.
     */
    sidebarContentProcessor?: (sidebar: DefaultTheme.SidebarMulti) => DefaultTheme.SidebarMulti
  };

  //export type NavbarConfig = {
  //  /**
  //   * Whether or not to process navbar URLs. Uses the `navbarUrlProcessor` function.
  //   * @default true
  //   */
  //  processNavbarURLs?: boolean;

  //  /**
  //   * The function that processes navbar URLs.
  //   * @param url The URL to process.
  //   * @param version The version to process the URL for.
  //   * @returns The processed URL.
  //   * @default (url: string, version: Version) => `/${version}${url}`
  //   */
  //  navbarUrlProcessor?: (url: string, version: Version) => string;

  //  /**
  //   * The function that resolves the path to the navbar file for a given version.
  //   * @param version The version to resolve the navbar path for.
  //   * @returns The path to the navbar file for the given version.
  //   * @default (version: Version) => `.vitepress/navbars/versioned/${version}.json`
  //   */
  //  navbarPathResolver?: (version: Version) => string;
  //};

  export type SidebarItem = DefaultTheme.SidebarItem & {
    /**
     * Set to `false` to disable versioning of this URL.
     */
    process?: boolean;
  };

  export type NavbarItem = DefaultTheme.NavItem & {
    /**
     * Set to `false` to disable versioning of this URL.
     */
    process?: boolean;

    link?: string;
  };

  export type Sidebar = {
    [path: string]: SidebarItem[] | { items: SidebarItem[]; base: string };
  };

  //export type Navbar = NavbarItem[];

  export interface ThemeConfig extends DefaultTheme.Config {
    /**
     * Configuration relating to the version switcher.
     * Set to false to disable the version switcher.
     */
    versionSwitcher?: SwitcherConfig | false;

    sidebar?: Sidebar;

    //nav?: Navbar;
  }

  export interface Config extends UserConfig<ThemeConfig> {
    /**
     * Configuration relating to versioning.
     */
    versioning: {
      /**
       * A string representation of the latest version of the project (root).
       */
      latestVersion?: Version | null;

      /**
       * Configuration relating to versioned sidebar files.
       *
       * Set this to false to disable all sidebar versioning functionality.
       */
      sidebars?: SidebarConfig | false;

      ///**
      // * Configuration relating to versioned navbar files.
      // *
      // * Set this to false to disable all navbar versioning functionality.
      // */
      //navbars?: NavbarConfig | false;

      /**
       * Configuration relating to versioned rewrites.
       *
       * Set this to false to disable all rewrite versioning functionality.
       */
      rewrites?: RewritesConfig | false;
    };
  }
}
