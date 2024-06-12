import { defineConfig } from 'vitepress'
import defineVersionedConfig from '../../src'

// https://vitepress.dev/reference/site-config
export default defineVersionedConfig(__dirname, {
  versioning: {
    latestVersion: '1.0.0',
    rewrites: {
      localePrefix: "translated",
    }
  },

  rewrites: {
    'translated/:lang/(.*)': ':lang/(.*)'
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    fr: {
      label: 'French',
      lang: 'fr',
      link: '/fr/',
      themeConfig: {
        // @ts-ignore
        versioning: {
          switcher: {
            text: "Changer de version",
          }
        },

        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Examples', link: '/markdown-examples' }
        ],

        sidebar: {
          '/': [
            {
              text: '1.0.0',
              link: '/'
            }
          ],
          '/fr/': [
            {
              text: '1.0.0 but in french',
              link: '/fr/'
            }
          ]
        },

        socialLinks: [
          { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
      }
    }
  },

  title: "Versioning Test",
  description: "A test versioning site.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: {
      '/': [
        {
          text: '1.0.0',
          link: '/'
        }
      ],
      '/fr/': [
        {
          text: '1.0.0 but in french',
          link: '/fr/'
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
