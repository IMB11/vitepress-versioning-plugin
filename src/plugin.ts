import type { ConfigEnv, Plugin, UserConfig as ViteUserConfig } from "vite"
import { SiteConfig, UserConfig as PressUserConfig } from "vitepress";
import fs from "node:fs";
import path from "node:path";
import clc from "cli-color";
import _ from "lodash";
import { createLogger } from "vite";

import { generateVersionRewrites } from "./rewrites";
import { generateVersionSidebars } from "./sidebars";
import { generateVersionSwitcher } from "./switcher";
import { VVP } from "./types";
import { defaultConfig, defaultThemeConfig } from "./defaults";

export type VersioningPluginConfig = {
  versioning?: {
    latestVersion?: string | null;
    sidebars?: VVP.SidebarConfig | false;
    rewrites?: VVP.RewritesConfig | false;
  };
  versionSwitcher?: VVP.SwitcherConfig | false;
}

export default (pluginConfig: VersioningPluginConfig = {}): Plugin => {
  const logger = createLogger();
  
  const plugin: Plugin & any = {
    name: 'vite:vitepress-versioning-plugin',
    enforce: 'pre',
    
    configResolved(viteConfig: ViteUserConfig, env: ConfigEnv) {
      const vitepressConfig: SiteConfig = (viteConfig as any).vitepress;
      
      if (!vitepressConfig) {
        logger.warn('[vitepress-versioning-plugin] VitePress config not found');
        return;
      }
      
      const vitepressUserConfig: PressUserConfig = vitepressConfig.userConfig;
      const rootDir = vitepressConfig.root || process.cwd();
      const configDir = path.dirname(vitepressConfig.configPath || path.join(rootDir, '.vitepress/config.ts'));
      
      // Process versioning
      plugin.processVersioning(vitepressUserConfig, configDir, pluginConfig);
    },
    
    processVersioning(userConfig: PressUserConfig, configDir: string, pluginConfig: VersioningPluginConfig) {
      // Merge with defaults
      const config = _.defaultsDeep(
        { versioning: pluginConfig.versioning },
        defaultConfig
      );
      
      // Load versions
      const versions = plugin.loadVersions(configDir);
      
      // Process theme config
      plugin.processThemeConfigs(userConfig, config, versions, configDir, pluginConfig);
      
      // Generate rewrites
      plugin.generateRewrites(userConfig, config, versions, configDir);
    },
    
    loadVersions(configDir: string): string[] {
      const versionsFolder = path.resolve(configDir, "..", "versions");
      
      if (!fs.existsSync(versionsFolder)) {
        fs.mkdirSync(versionsFolder, { recursive: true });
        fs.writeFileSync(path.resolve(versionsFolder, ".gitkeep"), "");
        return [];
      }
      
      return fs
        .readdirSync(versionsFolder, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
    },
    
    processThemeConfigs(
      userConfig: PressUserConfig,
      config: any,
      versions: string[],
      configDir: string,
      pluginConfig: VersioningPluginConfig
    ) {
      const themeConfigs = [
        userConfig.themeConfig,
        ...Object.values(userConfig.locales ?? {}).map((locale) => locale.themeConfig),
      ].filter(Boolean);
      
      for (let themeConfig of themeConfigs) {
        themeConfig = _.defaultsDeep(themeConfig, defaultThemeConfig);
        
        // Generate version switcher
        const versionSwitcher = generateVersionSwitcher(
          pluginConfig.versionSwitcher ?? themeConfig.versionSwitcher,
          versions,
          config.versioning.latestVersion
        );
        
        if (versionSwitcher) {
          themeConfig.nav ??= [];
          // Add version switcher logic
        }
        
        // Process sidebars
        plugin.processSidebars(themeConfig, config, versions, configDir, userConfig);
        
        // Process navigation
        plugin.processNavigation(themeConfig, versions, config.versioning.latestVersion);
      }
    },
    
    processSidebars(themeConfig: any, config: any, versions: string[], configDir: string, userConfig: PressUserConfig) {
      if (Array.isArray(themeConfig.sidebar)) {
        logger.error(
          clc.red(`[vitepress-versioning-plugin]`) +
          " The sidebar cannot be an array. Please use a DefaultTheme.MultiSidebar object."
        );
        return;
      }
      
      themeConfig.sidebar = {
        ...themeConfig.sidebar,
        ...generateVersionSidebars(
          config.versioning.sidebars,
          configDir,
          versions,
          Object.keys(userConfig.locales ?? {})
        ),
      };
    },
    
    processNavigation(themeConfig: any, versions: string[], latestVersion: string | null) {
      if (themeConfig.nav) {
        themeConfig.nav = themeConfig.nav.map((item: any) => {
          return plugin.processNavItemRecursive(item, versions, latestVersion);
        });
      }
    },
    
    processNavItemRecursive(navItem: any, versions: string[], latestVersion: string | null): any {
      if (navItem.items) {
        navItem.items = navItem.items.map((item: any) =>
          plugin.processNavItemRecursive(item, versions, latestVersion)
        );
      }
      
      if (navItem.component) {
        navItem.props ??= {};
        navItem.props.versioningPlugin = {
          versions,
          latestVersion,
        };
      }
      
      return navItem;
    },
    
    generateRewrites(userConfig: PressUserConfig, config: any, versions: string[], configDir: string) {
      userConfig.rewrites = {
        ...userConfig.rewrites,
        ...generateVersionRewrites(
          config.versioning.rewrites,
          configDir,
          versions,
          Object.keys(userConfig.locales ?? {})
        ),
      };
    }
  }

  return plugin;
}