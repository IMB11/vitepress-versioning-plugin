import { DefaultTheme } from "vitepress";
import { Version, VersionedConfig } from ".";

/**
 * Generates a nav item for the version switcher, which contains all versions in the "versions" folder and the latest version.
 * @returns {DefaultTheme.NavItem} A nav item that contains all versions in the "versions" folder.
 */
export function generateVersionSwitcher(versions: Version[], config: VersionedConfig, switcherText: string | null = null): DefaultTheme.NavItem | undefined {
  if (!config.versioning.switcher) return undefined;

  const versionSwitcher: DefaultTheme.NavItem = {
    text: switcherText ?? (typeof config.versioning.switcher !== "boolean" ? config.versioning.switcher?.text : null)  ?? "Switch Version",
    items: []
  }

  if ((config.versioning.switcher as any).includeLatestVersion) {
    versionSwitcher.items.push({
      text: `${config.versioning.latestVersion} (latest)`,
      link: `/`
    });
  }

  for (const version of versions) {
    versionSwitcher.items.push({
      // @ts-ignore
      text: version,
      link: `/${version}/`
    })
  }

  return versionSwitcher;
}
