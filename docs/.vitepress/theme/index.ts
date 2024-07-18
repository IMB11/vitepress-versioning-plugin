import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import NavVersion from "./components/NavVersion.vue"

// Import style fixes and customizations.
import './style.css'
import { Theme } from 'vitepress';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('NavVersion', NavVersion)
  }
} satisfies Theme;