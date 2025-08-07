// @ts-ignore
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ACME API Platform",
  description: "Enterprise-grade API documentation for the ACME API Platform - demonstrating VitePress Versioning Plugin capabilities",
  
  // Ignore dead links for this demo project
  ignoreDeadLinks: true,
  
  // Internationalization configuration
  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    es: {
      label: 'Español',
      lang: 'es',
      description: 'Documentación de API de nivel empresarial para la Plataforma API ACME'
    },
    fr: {
      label: 'Français', 
      lang: 'fr',
      description: 'Documentation API de niveau entreprise pour la plateforme API ACME'
    }
  },

  themeConfig: {
    // Version switcher configuration
    versionSwitcher: {
      text: "API Version",
      includeLatestVersion: true
    },

    // Navigation for latest version
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { 
        text: 'API Reference', 
        items: [
          { text: 'User Management', link: '/api/users' },
          { text: 'Payments', link: '/api/payments' },
          { text: 'Analytics', link: '/api/analytics' },
          { text: 'Notifications', link: '/api/notifications' }
        ]
      },
      { 
        text: 'Guides', 
        items: [
          { text: 'Authentication', link: '/guides/authentication' },
          { text: 'Error Handling', link: '/guides/error-handling' },
          { text: 'Rate Limiting', link: '/guides/rate-limiting' },
          { text: 'SDKs', link: '/guides/sdks' }
        ]
      },
      { text: 'Troubleshooting', link: '/troubleshooting' }
    ],

    // Sidebar for latest version (will be enhanced by versioning plugin)
    sidebar: {
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'User Management', link: '/api/users' },
            { text: 'Payments', link: '/api/payments' },
            { text: 'Analytics', link: '/api/analytics' },
            { text: 'Notifications', link: '/api/notifications' }
          ]
        }
      ],
      '/guides/': [
        {
          text: 'Developer Guides',
          items: [
            { text: 'Overview', link: '/guides/' },
            { text: 'Authentication', link: '/guides/authentication' },
            { text: 'Error Handling', link: '/guides/error-handling' },
            { text: 'Rate Limiting', link: '/guides/rate-limiting' },
            { text: 'SDKs', link: '/guides/sdks' }
          ]
        }
      ],
      '/': [
        {
          text: 'Documentation',
          items: [
            { text: 'Getting Started', link: '/getting-started' },
            { text: 'API Reference', link: '/api/' },
            { text: 'Developer Guides', link: '/guides/' },
            { text: 'Troubleshooting', link: '/troubleshooting' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/acme/api-platform' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 ACME Corporation'
    }
  },

  // Vite configuration (versioning plugin would be added here)
  vite: {
    plugins: [
      // Note: In a real implementation, you would add:
      // versioningPlugin({
      //   versioning: {
      //     latestVersion: "v2.0.0",
      //     sidebars: {
      //       processSidebarURLs: true,
      //       sidebarPathResolver: (version) => `.vitepress/sidebars/versioned/${version}.json`,
      //       sidebarUrlProcessor: (url, version) => `/${version}${url}`
      //     },
      //     rewrites: {
      //       localePrefix: "",
      //       rewriteProcessor: (inputFilePath, version) => 
      //         inputFilePath.replace("versions/", "").replace(`${version}/`, `${version}/`),
      //       localeRewriteProcessor: (inputFilePath, version, locale) =>
      //         `${locale}/${inputFilePath.replace("versions/", "").replace(`${version}/`, `${version}/`)}`
      //     }
      //   },
      //   versionSwitcher: {
      //     text: "API Version",
      //     includeLatestVersion: true
      //   }
      // })
    ]
  }
})