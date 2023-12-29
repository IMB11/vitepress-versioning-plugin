import fs from "node:fs"
import { createLogger } from "vite";
import { Version, VersionedConfig } from ".";

const LOGGER = createLogger();

export const getLogger = () => LOGGER;

export function getFilesRecursively(dir: string, config: VersionedConfig): string[] {
  const files: string[] = [];

  function traverseDirectory(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = `${currentDir}/${entry.name}`;

      if (entry.isDirectory()) {

        // Skip the locale folders
        if (Object.keys(config.locales ?? {}).includes(entry.name)) {
          continue;
        }

        traverseDirectory(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  }

  traverseDirectory(dir);

  return files;
}