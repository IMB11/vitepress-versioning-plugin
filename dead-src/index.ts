import clc from "cli-color";
import _ from "lodash";
import fs from "node:fs";
import path from "node:path";
import { createLogger } from "vite";
import { DefaultTheme, UserConfig } from "vitepress";
import { generateVersionRewrites } from "./rewrites";
import { generateVersionSidebars } from "./sidebars";
import { generateVersionSwitcher } from "./switcher";
import { Versioned } from "./types";
import { defaultConfig, defaultThemeConfig } from "./defaults";
// import { generateVersionedNavbars } from "./navbars";

// TODO: Fix nav bar elements (not versioned) - Seems not to be possible due to VitePress limitation...
// TODO: Changing version does not preserve language
// TODO: Change URL format to `/version/lang/file`

export { Versioned };

/**
 * Processes the default theme config with versioning config.
 * @param config The default theme config with versioning config.
 * @param dirname The value of __dirname when used from any typescript file in the `.vitepress` folder and ONLY the `.vitepress` folder.
 * @returns The default theme config with versioning config.
 */
export default function defineVersionedConfig(
  config: Versioned.Config,
  dirname: string
): UserConfig<DefaultTheme.Config> {
  const logger = createLogger();

  // TODO: Does this convert to UserConfig correctly?
  const configBackup = { ...config };
  config = _.defaultsDeep(config, defaultConfig);

  // Load all the versions from the "versions" folder.
  const versions: Versioned.Version[] = [];
  const versionsFolder = path.resolve(dirname, "..", "versions");

  if (!fs.existsSync(versionsFolder)) {
    fs.mkdirSync(versionsFolder);
    fs.writeFileSync(path.resolve(versionsFolder, ".gitkeep"), "");
  }

  const versionFolders = fs
    .readdirSync(versionsFolder, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());
  versions.push(...versionFolders.map((dirent) => dirent.name));

  // Convert all `VersionedThemeConfig`s to `DefaultTheme.Config`s
  for (let themeConfig of [
    config.themeConfig,
    ...Object.values(config.locales ?? {}).map((locale) => locale.themeConfig),
  ]) {
    if (!themeConfig) continue;

    themeConfig = _.defaultsDeep(
      themeConfig,
      defaultThemeConfig
    ) as Versioned.ThemeConfig;

    // // Generate navbars
    // themeConfig.nav = [
    //   ...themeConfig.nav ?? [],
    //   ...generateVersionedNavbars(
    //     config.versioning.navbars!,
    //     dirname,
    //     versions,
    //     Object.keys(config.locales ?? {})
    //   ).flat(),
    // ]

    // console.log(themeConfig.nav)

    // Generate the version switcher
    const versionSwitcher = generateVersionSwitcher(
      themeConfig.versionSwitcher!,
      versions,
      config.versioning.latestVersion!
    );
    if (versionSwitcher) {
      themeConfig.nav ??= [];
      // themeConfig.nav.push(versionSwitcher);
    }

    // Add versioning props to navbar items
    if (themeConfig.nav) {
      themeConfig.nav = themeConfig.nav.map((item: any) => {
        if (item.component) {
          item.props ??= {};
          item.props.versioningPlugin = {
            versions,
            latestVersion: config.versioning.latestVersion!,
          };
        }
        return item;
      });
    }

    // Generate the sidebars
    if (Array.isArray(themeConfig.sidebar)) {
      logger.error(
        clc.red(`[vitepress-plugin-versioning]`) +
          " The sidebar cannot be an array. Please use a DefaultTheme.MultiSidebar object where the root ('/') is your array."
      );
      logger.info(
        clc.yellow(`[vitepress-plugin-versioning]`) +
          " Versioned sidebar preperation failed, disabling versioning."
      );
      return configBackup; // TODO: This entirely disables versioning, is this intentional?
    } else {
      themeConfig.sidebar = {
        ...themeConfig.sidebar,
        ...generateVersionSidebars(
          config.versioning.sidebars!,
          dirname,
          versions,
          Object.keys(config.locales ?? {})
        ),
      };
    }
  }

  // Generate the rewrites
  config.rewrites = {
    ...config.rewrites,
    ...generateVersionRewrites(
      config.versioning.rewrites!,
      dirname,
      versions,
      Object.keys(config.locales ?? {})
    ),
  };

  try {
    if(config.versioning.sidebars) {
      if(config.versioning.sidebars.sidebarContentProcessor) {
        // For all sidebars, in locales and main themeConfig
        for (const locale of Object.keys(config.locales ?? {})) {
          if(config.locales?.[locale]?.themeConfig) {
            // @ts-ignore
            config.locales[locale].themeConfig.sidebar = config.versioning.sidebars.sidebarContentProcessor!(config.locales[locale].themeConfig.sidebar as DefaultTheme.SidebarMulti);
          } 
        }
      }
    }
  } catch (e) {
    logger.error("Something went wrong when processing the sidebar content.")
    logger.error(e as any);
    logger.info("Reverting to pre-processed sidebar configs.");
  }

  // For all components within themeConfig.nav and locale.themeConfig.nav, insert version information into the props.
  if(config?.themeConfig?.nav) {
  
    // Recursive map function to process all items in the nav bar.
    const processNavbarItemRecursive = (navbarItem: any): DefaultTheme.NavItem => {
    
      if (navbarItem?.items) {
        navbarItem.items = navbarItem.items.map((item: any) =>
          processNavbarItemRecursive(item)
        ) as (DefaultTheme.NavItemWithLink | DefaultTheme.NavItemChildren)[];
      }

      if (navbarItem?.component) {
        navbarItem.props ??= {};
        navbarItem.props.versioningPlugin = {
          versions,
          latestVersion: config.versioning.latestVersion!,
        }
      }
    
      return navbarItem;
    }

    // Process all items in the nav bar.
    config.themeConfig.nav = config.themeConfig.nav.map((item) => processNavbarItemRecursive(item));
  }


  return config;
}
