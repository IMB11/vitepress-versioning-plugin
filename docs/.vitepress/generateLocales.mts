import { LocaleConfig } from "vitepress";
import { VersionedSidebar, VersionedThemeConfig } from "../../src/types";

export function generateLocales(): LocaleConfig<VersionedThemeConfig> {
  const localisations = {
    root: [
      "English",
      "Index",
      "Example",
      "https://github.com/IMB11/vitepress-versioning-plugin/",
      "Switch Version",
      "Version 1.0.0 - English",
    ],
    fr: [
      "Français",
      "Accueil",
      "Exemple",
      "https://github.com/IMB11/vitepress-versioning-plugin/",
      "Changer de Version",
      "Version 1.0.0 - Français",
    ],
  };

  const sidebarConfig: VersionedSidebar = {};
  for (const locale of Object.keys(localisations)) {
    const translations = localisations[locale];

    sidebarConfig[(locale === "root" ? "" : `/${locale}`) + "/"] = [
      {
        text: translations[5],
        link: "/",
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
            text: translations[1],
            link: (locale === "root" ? "" : `/${locale}`) + "/",
          },
          {
            text: translations[2],
            link:
              (locale === "root" ? "" : `/${locale}`) + "/example",
          },
        ],
        sidebar: sidebarConfig,
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
