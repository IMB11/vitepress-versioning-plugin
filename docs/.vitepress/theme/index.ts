import DefaultTheme from 'vitepress/theme'
import VersionSwitcher from '../../../src/components/VersionSwitcher.vue'

// Import style fixes and customizations.
import './style.css'
import { Theme } from 'vitepress';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('VersionSwitcher', VersionSwitcher)
  }
} satisfies Theme;