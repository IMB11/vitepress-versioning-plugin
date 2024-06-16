import { LocaleConfig } from "vitepress";
import { VersionedSidebar, VersionedThemeConfig } from "../../src/types";

import English from "./i18n/en_us";
import French from "./i18n/fr_fr";

export function generateLocales(): LocaleConfig<VersionedThemeConfig> {
  // Load localisation from ./i18n, load en_us.json into localisation["root"] whilst everything else is loaded into localisation[locale]
  const localisations = {
    root: English,
    fr: French
  }

  const sidebarConfig: VersionedSidebar = {};
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
    ];
  }

  const localeConfig: LocaleConfig<VersionedThemeConfig> = {};
  for (const locale of Object.keys(localisations)) {
    const translations = localisations[locale];

    localeConfig[locale] = {
      label: translations[0],
      lang: locale === "root" ? "en" : locale,
      link: (locale === "root" ? "" : `/${locale}`) + "/",
      themeConfig: {
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
          }
        ],
        sidebar: sidebarConfig,
        outline: "deep",
        socialLinks: [
          {
            icon: "github",
            link: translations[3],
          },
        ],
        versionSwitcher: {
          text: translations[4],
        },
      },
    };
  }

  return localeConfig;
}
