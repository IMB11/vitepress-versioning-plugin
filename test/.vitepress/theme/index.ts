import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
// Note: In a real implementation, you would import:
// import { VersionSwitcher } from 'vitepress-versioning-plugin/components'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // Insert the VersionSwitcher in the navbar (when plugin is properly integrated)
      // 'nav-bar-content-after': () => h(VersionSwitcher)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Register global components (when plugin is properly integrated)
    // app.component('VersionSwitcher', VersionSwitcher)
  }
}