import path from "node:path";
import fs from "node:fs";
import { getFilesRecursively } from "./util";
import { Version, VersionRewritesConfig, VersionedConfig } from ".";

export type Rewrite = Record<string, string>

/**
 * Generates vitepress rewrites for all versions in the "versions" folder.
 * The rewrites are used to format the URLs in `versions` to be more user-friendly.
 * @returns {Record<string, string>} A map of rewrite sources to their destinations.
 */
export function generateVersionRewrites(dirName: string, versions: Version[], config: VersionedConfig): Rewrite {
  if (!config.versioning.rewrites) return {};

  const versionsDir = path.resolve(dirName, '..', 'versions');
  const rewrites: Rewrite = {};

  // Generate rewrites for each version's files.
  for (const version of versions) {
    // Get all files recursively in the version folder
    const files = getFilesRecursively(path.resolve(versionsDir, version), config);

    const rewriteSources = files.map(filePath => filePath.replace(versionsDir, 'versions'));

    for (const rewriteSource of rewriteSources) {
      // @ts-ignore
      rewrites[rewriteSource] = (config.versioning.rewrites as VersionRewritesConfig).rewriteProcessor(rewriteSource, version);
    }

    // Manage locale rewrites
    const locales = Object.keys(config.locales ?? {});

    for (const locale of locales) {
      const versionLocalePath = path.resolve(versionsDir, version, locale);

      if (!fs.existsSync(versionLocalePath)) continue;

      const localeFiles = getFilesRecursively(path.resolve(versionsDir, version, locale), config);

      const localeRewriteSources = localeFiles.map(filePath => filePath.replace(versionsDir, 'versions'));

      for (const rewriteSource of localeRewriteSources) {
        // @ts-ignore
        rewrites[`${rewriteSource}`] = (config.versioning.rewrites as VersionRewritesConfig).localeRewriteProcessor(rewriteSource, version, locale);
      }
    }
  }

  return rewrites
}