import fs from "node:fs";
import path from "node:path";
import { Version, VersionRewritesConfig } from "./types";

function getFilesRecursively(dirname: string, locales: string[]): string[] {
  let files: string[] = [];

  for (const entry of fs.readdirSync(dirname, { withFileTypes: true })) {
    const entryPath = `${dirname}/${entry.name}`;

    if (entry.isDirectory()) {
      // Skip the locale folders
      // TODO: some projects may place translations in paths different to this
      if (locales.includes(entry.name)) {
        continue;
      }

      files = [...files, ...getFilesRecursively(entryPath, locales)];
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

/**
 * Generates vitepress rewrites for all versions in the "versions" folder.
 * The rewrites are used to format the URLs in `versions` to be more user-friendly.
 * @returns {Record<string, string>} A map of rewrite sources to their destinations.
 */
export function generateVersionRewrites(
  config: VersionRewritesConfig | false,
  dirname: string,
  versions: Version[],
  locales: string[] = []
): Record<string, string> {
  const versionRewrites: Record<string, string> = {};
  if (config === false) return versionRewrites;

  const versionsDir = path.resolve(dirname, "..", "versions");

  // Generate rewrites for each version's files.
  for (const version of versions) {
    // Get all files recursively in the version folder
    const files = getFilesRecursively(
      path.resolve(versionsDir, version),
      locales
    );

    for (const rewriteSource of files.map((filePath) =>
      filePath.replace(versionsDir, "versions")
    )) {
      versionRewrites[rewriteSource] = config.rewriteProcessor!(
        rewriteSource,
        version
      );
    }

    // Manage locale rewrites
    for (const locale of locales) {
      const versionLocalePath = path.resolve(
        versionsDir,
        version,
        config.localePrefix!,
        locale
      );

      if (!fs.existsSync(versionLocalePath)) continue;

      const localeFiles = getFilesRecursively(
        path.resolve(versionsDir, version, config.localePrefix!, locale),
        locales
      );

      const localeRewriteSources = localeFiles.map((filePath) =>
        filePath.replace(versionsDir, "versions")
      );

      for (const rewriteSource of localeRewriteSources) {
        versionRewrites[`${rewriteSource}`] = config.localeRewriteProcessor!(
          rewriteSource,
          version,
          locale
        ).replace(`/${config.localePrefix!}`, "");
      }
    }
  }

  // console.log(versionRewrites)

  return versionRewrites;
}
