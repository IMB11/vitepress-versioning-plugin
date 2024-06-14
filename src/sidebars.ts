import JSON5 from "json5";
import fs from "node:fs";
import path from "node:path";
import { DefaultTheme } from "vitepress";
import { Version, VersionedSidebarConfig, VersionedSidebarItem } from "./types";

/**
 * Replaces all links in the sidebar with their versioned equivalents.
 * @example `{link: '/test'}` becomes `{link: '/0.1.0/test'}`
 * @param sidebar The sidebar to replace links in.
 * @param version The version to prepend to all links.
 * @returns {DefaultTheme.SidebarItem[]} The sidebar with all links prepended with the version.
 */
function replaceLinksRecursive(
  sidebar: VersionedSidebarItem[],
  config: VersionedSidebarConfig,
  version: Version
): DefaultTheme.SidebarItem[] {
  // Prepend the version to all links. `{VERSION}/$link`
  return sidebar.map((item) => {
    if (item.process === false) {
      return item;
    }

    if (item.link) {
      item.link = config.sidebarUrlProcessor!(item.link, version);
    }

    if (item.items) {
      item.items = replaceLinksRecursive(item.items, config, version);
    }

    return item;
  });
}

/**
 * Gets the sidebar for a specific version.
 * This function will look for a sidebar.json file in the specified version's folder, or else return an empty sidebar.
 * @param version Get the sidebar for a specific version.
 * @returns {DefaultTheme.SidebarItem[]} The sidebar for the specified version.
 */
function getSidebar(
  config: VersionedSidebarConfig,
  dirname: string,
  version: Version,
  locale: string
): DefaultTheme.Sidebar {
  const sidebarPath = path.resolve(
    dirname,
    "..",
    config.sidebarPathResolver!(
      version + (locale === "root" ? "" : `-${locale}`)
    )
  );

  if (fs.existsSync(sidebarPath)) {
    const sidebar = JSON5.parse(fs.readFileSync(sidebarPath, "utf-8"));

    if (Array.isArray(sidebar)) {
      // Replace all links in the sidebar with their versioned equivalents.
      return replaceLinksRecursive(
        sidebar as VersionedSidebarItem[],
        config,
        (locale === "root" ? "" : `${locale}/`) + version
      );
    } else {
      // Must be a multisidebar instance.
      const multiSidebar = sidebar as DefaultTheme.SidebarMulti;

      // Replace all links in the sidebar with their versioned equivalents.
      Object.keys(multiSidebar).forEach((key) => {
        multiSidebar[key] = replaceLinksRecursive(
          multiSidebar[key] as VersionedSidebarItem[],
          config,
          (locale === "root" ? "" : `${locale}/`) + version
        );
      });

      return multiSidebar;
    }
  }

  return [];
}

/**
 * Generates a sidebar for each version in the "versions" folder.
 * @returns {DefaultTheme.SidebarMulti} A map of versions to their sidebars.
 */
export function generateVersionSidebars(
  config: VersionedSidebarConfig | false,
  dirname: string,
  versions: Version[],
  locales: string[]
): DefaultTheme.SidebarMulti {
  const versionSidebars: DefaultTheme.SidebarMulti = {};
  if (config === false) return versionSidebars;

  for (const version of versions) {
    for (const locale of locales) {
      const sidebar = getSidebar(config, dirname, version, locale);

      if (Array.isArray(sidebar)) {
        versionSidebars[
          (locale === "root" ? "" : `/${locale}`) + `/${version}`
        ] = sidebar;
      } else {
        Object.keys(sidebar).forEach((key) => {
          versionSidebars[
            (locale === "root" ? "" : `/${locale}`) + `/${version}${key}`
          ] = (sidebar as DefaultTheme.SidebarMulti)[key];
        });
      }
    }
  }

  return versionSidebars;
}
