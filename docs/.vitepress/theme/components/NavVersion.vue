<script setup lang="ts">
import { useRouter } from "vitepress"
import { computed, ref } from 'vue'
import VPMenuLink from 'vitepress/dist/client/theme-default/components/VPMenuLink.vue'
import VPFlyout from 'vitepress/dist/client/theme-default/components/VPFlyout.vue'
const props = defineProps<{
  versioningPlugin: { versions: string[], latestVersion: string }
  screenMenu?: boolean
}>();

const router = useRouter();

const currentVersion = computed(() => {
  let version = props.versioningPlugin.latestVersion;

  for (const v of props.versioningPlugin.versions) {
    if (router.route.path.startsWith(`/${v}/`)) {
      version = v;
      break;
    }
  }

  return version;
});

const isOpen = ref(false);
const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <VPFlyout v-if="!screenMenu" class="VPVersionSwitcher" icon="vpi-versioning" :button="currentVersion"
    :label="'Switch Version'">
    <div class="items">
      <VPMenuLink v-if="currentVersion != versioningPlugin.latestVersion" :item="{
        text: versioningPlugin.latestVersion,
        link: `/`,
      }" />
      <template v-for="version in versioningPlugin.versions" :key="version">
        <VPMenuLink v-if="currentVersion != version" :item="{
          text: version,
          link: `/${version}/`,
        }" />
      </template>
    </div>
  </VPFlyout>
  <div v-else class="VPScreenVersionSwitcher" :class="{ open: isOpen }">
    <button class="button" aria-controls="navbar-group-version" :aria-expanded="isOpen" @click="toggle">
      <span class="button-text"><span class="vpi-versioning icon" /> Switch Version</span>
      <span class="vpi-plus button-icon" />
    </button>

    <div id="navbar-group-version" class="items">
      <VPMenuLink :item="{
        text: versioningPlugin.latestVersion,
        link: `/`,
      }" />
      <template v-for="version in versioningPlugin.versions" :key="version">
        <VPMenuLink :item="{
          text: version,
          link: `/${version}/`,
        }" />
      </template>
    </div>
  </div>
</template>

<style>
.vpi-versioning.option-icon {
  margin-right: 2px !important;
}
</style>

<style scoped>
.VPVersionSwitcher {
  display: none;
}

@media (min-width: 1280px) {
  .VPVersionSwitcher {
    display: flex;
    align-items: center;
  }
}

.icon {
  padding: 8px;
}

.title {
  padding: 0 24px 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.VPScreenVersionSwitcher {
  border-bottom: 1px solid var(--vp-c-divider);
  height: 48px;
  overflow: hidden;
  transition: border-color 0.5s;
}

.VPScreenVersionSwitcher .items {
  visibility: hidden;
}

.VPScreenVersionSwitcher.open .items {
  visibility: visible;
}

.VPScreenVersionSwitcher.open {
  padding-bottom: 10px;
  height: auto;
}

.VPScreenVersionSwitcher.open .button {
  padding-bottom: 6px;
  color: var(--vp-c-brand-1);
}

.VPScreenVersionSwitcher.open .button-icon {
  /*rtl:ignore*/
  transform: rotate(45deg);
}

.button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 4px 11px 0;
  width: 100%;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.button:hover {
  color: var(--vp-c-brand-1);
}

.button-icon {
  transition: transform 0.25s;
}

.group:first-child {
  padding-top: 0px;
}

.group+.group,
.group+.item {
  padding-top: 4px;
}
</style>