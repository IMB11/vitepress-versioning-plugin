import { LocaleConfig } from "vitepress";
import type {Versioned} from "../../src/types";

import English from "./i18n/en_us";
import Test from "./i18n/test";
// TODO: French translations
// import French from "./i18n/fr_fr";

export function generateLocales(): LocaleConfig<Versioned.ThemeConfig> {
  // Load localisation from ./i18n, load en_us.json into localisation["root"] whilst everything else is loaded into localisation[locale]
  const localisations = {
    root: English,
    test: Test
    // fr: French
  }

  const sidebarConfig: Versioned.Sidebar = {};
  for (const locale of Object.keys(localisations)) {
    const translations = localisations[locale];

    const linkPrefix = locale === "root" ? "" : `/${locale}`;
    sidebarConfig[linkPrefix + "/guide/"] = [
      {
        text: translations["installation"],
        link: linkPrefix + "/guide/",
      },
      {
        text: translations["basicSetup"],
        link: linkPrefix + "/guide/basic-setup",
      },
      {
        text: translations["addingVersion"],
        link: linkPrefix + "/guide/adding-version",
      },
      {
        text: translations["addingTranslations"],
        link: linkPrefix + "/guide/adding-translations",
      },
      {
        text: translations["troubleshooting"],
        link: linkPrefix + "/guide/troubleshooting",
      }
    ];
  }

  const localeConfig: LocaleConfig<Versioned.ThemeConfig> = {};
  for (const locale of Object.keys(localisations)) {
    const translations = localisations[locale];

    localeConfig[locale] = {
      label: translations[locale],
      lang: locale === "root" ? "en" : locale,
      link: (locale === "root" ? "" : `/${locale}`) + "/",
      themeConfig: {
        versionSwitcher: false,
        nav: [
          {
            text: translations["home"],
            link: (locale === "root" ? "" : `/${locale}`) + "/",
          },
          {
            text: translations["gettingStarted"],
            link:
              (locale === "root" ? "" : `/${locale}`) + "/guide/",
          },
          {
            text: translations["configReference"],
            link:
              (locale === "root" ? "" : `/${locale}`) + "/config/",
          },
          {
            component: 'VersionSwitcher',
          },
        ],
        sidebar: sidebarConfig,
        outline: "deep",
        socialLinks: [
          {
            icon: "github",
            link: "https://github.com/IMB11/vitepress-versioning-plugin",
          },
        ],
      },
    };
  }

  return localeConfig;
}
