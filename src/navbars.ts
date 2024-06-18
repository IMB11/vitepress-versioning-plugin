//import path from "node:path";
//import { Versioned } from "./types";
//import fs from "node:fs";
//import JSON5 from "json5";
//import { DefaultTheme } from "vitepress";

//export function processNavbarItemRecursive(
//  navbarItem: Versioned.NavbarItem,
//  config: Versioned.NavbarConfig,
//  version: Versioned.Version
//): Versioned.NavbarItem | Versioned.NavbarItem[] {
//  if (Array.isArray(navbarItem)) {
//    return navbarItem.map((item) =>
//      processNavbarItemRecursive(item, config, version)
//    ) as Versioned.NavbarItem[];
//  }

//  if (navbarItem.process === false) return navbarItem;

//  if (navbarItem.link) {
//    navbarItem.link = config.navbarUrlProcessor!(navbarItem.link, version);
//  }

//  if (navbarItem.items) {
//    navbarItem.items = navbarItem.items.map((item) =>
//      processNavbarItemRecursive(item, config, version)
//    ) as (DefaultTheme.NavItemChildren | DefaultTheme.NavItemWithLink)[];
//  }

//  // Add activeMatch that matches the version URL.
//  if (!navbarItem.activeMatch) {
//    navbarItem.activeMatch = `/${version}/.*$`;
//  }

//  return navbarItem;
//}

//export function getNavbar(
//  config: Versioned.NavbarConfig,
//  dirname: string,
//  version: Versioned.Version,
//  locale: string
//): Versioned.NavbarItem[] {
//  const navbarPath = path.resolve(
//    dirname,
//    "..",
//    config.navbarPathResolver!(
//      version + (locale === "root" ? "" : `-${locale}`)
//    )
//  );

//  let navbars = [];
//  if (fs.existsSync(navbarPath)) {
//    let navbar = JSON5.parse(fs.readFileSync(navbarPath, "utf-8"));
//    navbar = processNavbarItemRecursive(navbar, config, version);
//    navbars.push(navbar);
//  }

//  return navbars;
//}

//export function generateVersionedNavbars(
//  config: Versioned.NavbarConfig | false,
//  dirname: string,
//  versions: Versioned.Version[],
//  locales: string[]
//): Versioned.NavbarItem[] {
//  // The goal is to load the navbar from the path specified by config.navbarPathResolver.
//  // These loaded navbar items need to have the `activeMatch: '/${version}/'` property set unless they have process set to false.

//  if (config === false) return [];

//  let versionedItems: Versioned.NavbarItem[] = [];
//  for (const version of versions) {
//    for (const locale of locales) {
//      const navbar = getNavbar(config, dirname, version, locale);
//      versionedItems.push(...navbar);
//    }
//  }

//  return versionedItems;
//}
