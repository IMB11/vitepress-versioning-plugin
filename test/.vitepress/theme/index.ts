import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { VersionSwitcher } from 'vitepress-versioning-plugin/components'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // Insert the VersionSwitcher in the navbar
      'nav-bar-content-after': () => h(VersionSwitcher)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Register global components
    app.component('VersionSwitcher', VersionSwitcher)
  }
}