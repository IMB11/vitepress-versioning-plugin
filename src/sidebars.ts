import { DefaultTheme } from "vitepress";
import { Version, VersionedConfig, VersionedSidebarConfig } from ".";
import path from "node:path";
import fs from "node:fs";
import JSON5 from "json5";

/**
 * Replaces all links in the sidebar with their versioned equivalents.
 * @example `{link: '/test'}` becomes `{link: '/0.1.0/test'}`
 * @param sidebar The sidebar to replace links in.
 * @param version The version to prepend to all links.
 * @returns {DefaultTheme.SidebarItem[]} The sidebar with all links prepended with the version.
 */
function replaceLinksRecursive(sidebar: DefaultTheme.SidebarItem[], version: Version, config: VersionedConfig): DefaultTheme.SidebarItem[] {
  // Prepend the version to all links. `{VERSION}/$link`
  const versionedSidebar = sidebar.map(item => {
    // @ts-ignore
    if (item.process === false) return item;

    if (item.link) {
      // @ts-ignore
      item.link = (config.versioning.sidebars as VersionedSidebarConfig).sidebarUrlProcessor(item.link, version)
    }

    if (item.items) {
      item.items = replaceLinksRecursive(item.items, version, config)
    }

    return item
  })

  return versionedSidebar
}

/**
 * Gets the sidebar for a specific version.
 * This function will look for a sidebar.json5 file in the specified version's folder, or else return an empty sidebar.
 * @param version Get the sidebar for a specific version.
 * @returns {DefaultTheme.SidebarItem[]} The sidebar for the specified version.
 */
export function getSidebar(dirname: string, version: Version, config: VersionedConfig): DefaultTheme.Sidebar {
  // @ts-ignore
  const sidebarRootPath = (config.versioning.sidebars as VersionedSidebarConfig).sidebarPathResolver(version);
  const sidebarPath = path.resolve(dirname, "..", sidebarRootPath);
  if (fs.existsSync(sidebarPath)) {
    // JSON5 can easily parse both JSON and JSON5 files, so might as well just keep it.
    const sidebar = JSON5.parse(fs.readFileSync(sidebarPath, 'utf-8'))

    if (!Array.isArray(sidebar)) {
      // Must be a multisidebar instance.
      const multisidebar = sidebar as DefaultTheme.SidebarMulti;

      // Replace all links in the sidebar with their versioned equivalents.
      Object.keys(multisidebar).forEach(key => {
        multisidebar[key] = replaceLinksRecursive(multisidebar[key] as DefaultTheme.SidebarItem[], version, config)
      });

      return multisidebar;
    }

    // Replace all links in the sidebar with their versioned equivalents.
    return replaceLinksRecursive(sidebar, version, config)
  }

  return [];
}

export function getLocaleSidebar(dirname: string, version: Version, locale: string, config: VersionedConfig): DefaultTheme.Sidebar {
  // Same thing as above, but sidebar file is `version-locale.json` and URLs must also be prefixed with the locale.

  // @ts-ignore
  const sidebarRootPath = (config.versioning.sidebars as VersionedSidebarConfig).sidebarPathResolver(version + `-${locale}`);
  const sidebarPath = path.resolve(dirname, "..", sidebarRootPath);
  if (fs.existsSync(sidebarPath)) {
    // JSON5 can easily parse both JSON and JSON5 files, so might as well just keep it.
    const sidebar = JSON5.parse(fs.readFileSync(sidebarPath, 'utf-8'))

    if (!Array.isArray(sidebar)) {
      // Must be a multisidebar instance.
      const multisidebar = sidebar as DefaultTheme.SidebarMulti;

      // Replace all links in the sidebar with their versioned equivalents.
      Object.keys(multisidebar).forEach(key => {
        multisidebar[key] = replaceLinksRecursive(multisidebar[key] as DefaultTheme.SidebarItem[], `${locale}/` + version, config)
      });

      return multisidebar;
    }

    // Replace all links in the sidebar with their versioned equivalents.
    return replaceLinksRecursive(sidebar, `/${locale}` + version, config)
  }

  return [];
}

/**
 * Generates a sidebar for each version in the "versions" folder.
 * @returns {DefaultTheme.SidebarMulti} A map of versions to their sidebars.
 */
export function generateVersionSidebars(dirname: string, versions: Version[], config: VersionedConfig): DefaultTheme.SidebarMulti {
  const versionSidebars: DefaultTheme.SidebarMulti = {};

  if (config.versioning.sidebars === false) return versionSidebars;

  for (const version of versions) {
    const versionSidebar = getSidebar(dirname, version, config);

    if (Array.isArray(versionSidebar)) {
      versionSidebars[`/${version}/`] = versionSidebar as DefaultTheme.SidebarItem[]
    } else {
      Object.keys(versionSidebar).forEach(key => {
        versionSidebars[`/${version}${key}`] = versionSidebar[key] as DefaultTheme.SidebarItem[]
      });
    }

    // Repeat for locales (version-locale.json)
    const locales = Object.keys(config.locales ?? {});

    for (const locale of locales) {
      if (locale === 'root') continue;

      const versionLocaleSidebar = getLocaleSidebar(dirname, version, locale, config);

      if (Array.isArray(versionLocaleSidebar)) {
        versionSidebars[`/${locale}/${version}/`] = versionLocaleSidebar as DefaultTheme.SidebarItem[]
      } else {
        Object.keys(versionLocaleSidebar).forEach(key => {
          versionSidebars[`/${locale}/${version}${key}`] = versionLocaleSidebar[key] as DefaultTheme.SidebarItem[]
        });
      }
    }
  }

  return versionSidebars
}