import { defineConfig } from 'vitepress'
import defineVersionedConfig, { vitepressSidebarResolver } from '../../src'

// https://vitepress.dev/reference/site-config
export default defineVersionedConfig(__dirname, {
  versioning: {
    latestVersion: '1.0.0',
    sidebars: {
      sidebarPathResolver: vitepressSidebarResolver
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
          'text': '1.0.0',
          'link': '/'
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
