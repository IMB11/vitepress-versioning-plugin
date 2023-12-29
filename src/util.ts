import fs from "node:fs"
import { createLogger } from "vite";
import { Version } from ".";

const LOGGER = createLogger();

export const getLogger = () => LOGGER;

export function getFilesRecursively(dir: string): string[] {
  const files: string[] = [];

  function traverseDirectory(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = `${currentDir}/${entry.name}`;

      if (entry.isDirectory()) {
        traverseDirectory(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  }

  traverseDirectory(dir);

  return files;
}

/**
 * The function that resolves the path to the sidebar file for a given version.
 * @param version The version to resolve the sidebar path for.
 */
export const vitepressSidebarResolver = (version: Version) => `.vitepress/sidebars/versioned/${version}.json`;