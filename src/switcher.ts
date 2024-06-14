import { DefaultTheme } from "vitepress";
import { Version, VersionSwitcherConfig } from "./types";

/**
 * Generates a nav item for the version switcher, which contains all versions in the "versions" folder and the latest version.
 * @returns {DefaultTheme.NavItem} A nav item that contains all versions in the "versions" folder.
 */
export function generateVersionSwitcher(
  config: VersionSwitcherConfig | false,
  versions: Version[],
  latestVersion: Version | null
): DefaultTheme.NavItem | null {
  if (config === false) {
    return null;
  }

  const versionSwitcher: DefaultTheme.NavItem = {
    text: config.text,
    items: [],
  };

  if (config.includeLatestVersion) {
    versionSwitcher.items.push({
      text: latestVersion === null ? "Latest" : `${latestVersion} (latest)`,
      link: "/",
    });
  }

  for (const version of versions) {
    versionSwitcher.items.push({
      text: version,
      link: `/${version}/`,
    });
  }

  return versionSwitcher;
}
