// import path from "node:path";
// import { Version, VersionedNavbarConfig, VersionedNavbarItem } from "./types";
// import fs from "node:fs";
// import JSON5 from "json5"
// import { DefaultTheme } from "vitepress";

// export function processNavbarItemRecursive(navbarItem: VersionedNavbarItem, config: VersionedNavbarConfig, version: Version): VersionedNavbarItem | VersionedNavbarItem[] {
//   if(Array.isArray(navbarItem)) {
//     return navbarItem.map((item) => processNavbarItemRecursive(item, config, version)) as VersionedNavbarItem[];
//   }
  
//   if (navbarItem.process === false) return navbarItem;

//   if (navbarItem.link) {
//     navbarItem.link = config.navbarUrlProcessor!(navbarItem.link, version);
//   }

//   if (navbarItem.items) {
//     navbarItem.items = navbarItem.items.map((item) => processNavbarItemRecursive(item, config, version)) as (DefaultTheme.NavItemChildren | DefaultTheme.NavItemWithLink)[];
//   }

//   // Add activeMatch that matches the version URL.
//   if (!navbarItem.activeMatch) {
//     navbarItem.activeMatch = `/${version}/.*$`;
//   }

//   return navbarItem;
// }

// export function getNavbar(config: VersionedNavbarConfig, dirname: string, version: Version, locale: string): VersionedNavbarItem[] {
//   const navbarPath = path.resolve(
//     dirname,
//     "..",
//     config.navbarPathResolver!(
//       version + (locale === "root" ? "" : `-${locale}`)
//     )
//   );

//   let navbars = [];
//   if(fs.existsSync(navbarPath)) {
//     let navbar = JSON5.parse(fs.readFileSync(navbarPath, "utf-8"));
//     navbar = processNavbarItemRecursive(navbar, config, version);
//     navbars.push(navbar);
//   }

//   return navbars;
// }

// export function generateVersionedNavbars(config: VersionedNavbarConfig | false,
//   dirname: string,
//   versions: Version[],
//   locales: string[]): VersionedNavbarItem[] {
//   // The goal is to load the navbar from the path specified by config.navbarPathResolver.
//   // These loaded navbar items need to have the `activeMatch: '/${version}/'` property set unless they have process set to false.

//   if (config === false) return [];

//   let versionedItems: VersionedNavbarItem[] = [];
//   for (const version of versions) {
//     for (const locale of locales) {
//       const navbar = getNavbar(config, dirname, version, locale);
//       versionedItems.push(...navbar);
//     }
//   }

//   return versionedItems;
// }