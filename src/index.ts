import { DefaultTheme, UserConfig } from 'vitepress'
import _ from 'lodash';
import clc from "cli-color";
import path from 'node:path';
import fs from "node:fs"

import { getLogger } from './util';
import { generateVersionSwitcher } from './switcher';
import { generateVersionRewrites } from './rewrites';
import { generateVersionSidebars } from './sidebars';

export type Version = string;

export type VersionSwitcherConfig = {
  /**
   * The text to display on the version switcher button.
   */
  text?: string,

  /**
   * Should the latest (root) version be included in the version switcher?
   */
  includeLatestVersion?: boolean,
};

export type VersionedSidebarConfig = {
  /**
   * Whether or not to process sidebar URLs. Uses the `sidebarUrlProcessor` function.
   * @default true
   */
  processSidebarURLs?: boolean;

  /**
   * The function that resolves the path to the sidebar file for a given version.
   * @param version The version to resolve the sidebar path for.
   * @returns The path to the sidebar file for the given version.
   * @default (version) => `.vitepress/sidebars/versioned/${version}.json`
   */
  sidebarPathResolver?: (version: Version) => string;

  /**
   * The function that processes sidebar URLs.
   * @param url The URL to process.
   * @param version The version to process the URL for.
   * @returns The processed URL.
   * @default (url, version) => `/${version}${url}`
   */
  sidebarUrlProcessor?: (url: string, version: Version) => string;
}

export type VersionRewritesConfig = {
  /**
   * The function that processes rewrite URLs.
   * @param inputFilePath The input file path to process.
   * @param version The version to process the URL for.
   * @returns The processed URL.
   * @default (inputFilePath, version) => inputFilePath.replace(`versions/`, ``);
   * @example // Turns `/versions/1.0.0/index.md` into `/1.0.0/index.md`
   */
  rewriteProcessor?: (inputFilePath: string, version: Version) => string;

  /**
   * The function that processes rewrite URLs for locale folders.
   * @param inputFilePath The input file path to process.
   * @param version The version to process the URL for.
   * @param locale The locale to process the URL for.
   * @default (inputFilePath, version, locale) => `${locale}/` + inputFilePath.replace(`versions/`, ``).replace(`${locale}/`, ``)
   * @returns The processed URL.
   */
  localeRewriteProcessor?: (inputFilePath: string, version: Version, locale: string) => string;
}

export type VersionedConfig = UserConfig<DefaultTheme.Config> & {
  /**
   * Configuration options relating to versioning.
   */
  versioning: {
    /**
     * The latest (current/root) version of the project.
     */
    latestVersion: string,

    /**
     * Configuration options relating to the version switcher.
     * Set to false to disable the version switcher.
     */
    switcher?: VersionSwitcherConfig | boolean;

    /**
     * Configuration options relating to versioned sidebar files.
     * 
     * Set this to false to disable all sidebar versioning functionality.
     */
    sidebars?: VersionedSidebarConfig | boolean;
    /**
     * Configuration options relating to versioned rewrites.
     * 
     * Set this to false to disable all rewrite versioning functionality.
     */
    rewrites?: VersionRewritesConfig | boolean;
  };
};

// Initialize the default values
const defaultVersionedConfig = {
  versioning: {
    switcher: {
      text: 'Switch Version',
      includeLatestVersion: true,
    },
    sidebars: {
      useJson5: false,
      sidebarPathResolver: (version: Version) => `.vitepress/sidebars/versioned/${version}.json`,
      sidebarUrlProcessor: (url: string, version: Version) => `/${version}${url}`,
      processSidebarURLs: true,
    },
    rewrites: {
      rewriteProcessor: (inputFilePath: string, version: Version) => inputFilePath.replace(`versions/`, ``),
      localeRewriteProcessor: (inputFilePath: string, version: Version, locale: string) => `${locale}/` + inputFilePath.replace(`versions/`, ``).replace(`${locale}/`, ``)
    }
  },
};

/**
 * Processes the default theme config with versioned config options.
 * @param dirname The value of __dirname when used from any typescript file in the `.vitepress` folder and ONLY the `.vitepress` folder.
 * @param options The default theme config with versioned config options.
 * @returns The default theme config with versioned config options.
 */
export default function defineVersionedConfig(dirname: string, options: VersionedConfig): UserConfig<DefaultTheme.Config> {
  const logger = getLogger();

  // Replace all undefined values with their default values.
  options = _.defaultsDeep(options, defaultVersionedConfig);

  // Load all the versions from the "versions" folder.
  const versions: Version[] = [];
  const versionsFolder = path.resolve(dirname, '..', 'versions');

  if (!fs.existsSync(versionsFolder)) {
    fs.mkdirSync(versionsFolder);
    fs.writeFileSync(path.resolve(versionsFolder, '.gitkeep'), '');
  }

  const versionFolders = fs.readdirSync(versionsFolder, { withFileTypes: true }).filter(dirent => dirent.isDirectory());

  versions.push(...versionFolders.map(dirent => dirent.name));

  options.themeConfig = options.themeConfig || {};

  // Generate the version switcher
  options.themeConfig.nav = options.themeConfig.nav || [];
  const switcher = generateVersionSwitcher(versions, options);
  if (switcher) {
    options.themeConfig.nav.push(switcher);
  }

  // Generate the rewrites
  options.rewrites = options.rewrites || {};
  const rewrites = generateVersionRewrites(dirname, versions, options);
  options.rewrites = {
    ...options.rewrites,
    ...rewrites,
  };

  // Generate the sidebar
  if (options.themeConfig.sidebar === undefined) {
    options.themeConfig.sidebar = {};
  } else if (Array.isArray(options.themeConfig.sidebar)) {
    logger.error(clc.red(`[vitepress-plugin-versioning]`) + " The sidebar cannot be an array. Please use a DefaultTheme.MultiSidebar object where the root ('/') is your array.");
    logger.info(clc.yellow(`[vitepress-plugin-versioning]`) + " Versioned sidebar preperation failed, disabling sidebar versioning.");
    return options;
  };

  const sidebars = generateVersionSidebars(dirname, versions, options);
  options.themeConfig.sidebar = {
    ...options.themeConfig.sidebar,
    ...sidebars,
  };

  return options;
};