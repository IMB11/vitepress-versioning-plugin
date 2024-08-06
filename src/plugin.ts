import type { ConfigEnv, Plugin, UserConfig as ViteUserConfig } from "vite"
import { SiteConfig, UserConfig as PressUserConfig } from "vitepress";

type PluginConfig = {}

export default (config: PluginConfig = {}): Plugin => {
  return {
    name: 'vite:vitepress-versioning-plugin',
    enforce: 'pre',
    config(config: ViteUserConfig, env: ConfigEnv) {
        const vitepressConfig: SiteConfig = (config as any).vitepress;
        const vitepressUserConfig: PressUserConfig = vitepressConfig.userConfig;
        const rootDir = config.envDir;

        console.log(rootDir);
    },
  }
}