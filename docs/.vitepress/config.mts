import defineVersionedConfig from "../../src";
import { generateLocales } from "./generateLocales.mts";

// https://vitepress.dev/reference/site-config
export default defineVersionedConfig(
  {
    title: "Versioned Docs",
    description: "An example of a versioned documentation site.",
    cleanUrls: true,

    versioning: {
      latestVersion: "1.0.0",
      rewrites: {
        localePrefix: "translated",
      },
    },

    rewrites: {
      "translated/:lang/(.*)": ":lang/(.*)",
    },

    locales: generateLocales(),
  },
  __dirname
);
