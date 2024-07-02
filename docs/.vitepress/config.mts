import { DefaultTheme } from "vitepress";
import defineVersionedConfig from "../../src";
import { generateLocales } from "./generateLocales.mts";

// https://vitepress.dev/reference/site-config
export default defineVersionedConfig(
  {
    ignoreDeadLinks: true,
    title: "Vitepress Versioning Plugin",
    description: "A Vitepress plugin for versioning documentation.",
    cleanUrls: true,

    versioning: {
      latestVersion: "1.0.0",
      rewrites: {
        localePrefix: "translated",
      },
      sidebars: {
        sidebarContentProcessor(sidebar: DefaultTheme.SidebarMulti) {
            console.log(sidebar["/guide/"]);
            return sidebar;
        },
      }
    },

    rewrites: {
      "translated/:lang/(.*)": ":lang/(.*)",
    },

    locales: generateLocales(),
  },
  __dirname
);
