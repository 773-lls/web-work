<template>
  <aside class="side">
    <div class="side__head">
      <el-avatar :size="56" :src="store.avatar" />
      <span class="side__name">{{ store.name }}</span>
    </div>

    <el-menu class="side__button" :default-active="route.path" @select="go">
      <el-menu-item v-for="item in items" :key="item.path" :index="item.path">
        <el-icon><component :is="item.icon" /></el-icon>
        <template #title>{{ t(item.key) }}</template>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '@/directory/directory.js'
import { userStore as store } from '@/stores/user'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const items = [
  { path: '/home', icon: 'HomeFilled', key: 'nav.home' },
  { path: '/common', icon: 'Star', key: 'nav.common' },
  { path: '/app', icon: 'Grid', key: 'nav.app' },
  { path: '/course', icon: 'Reading', key: 'nav.course' },
  { path: '/major', icon: 'Collection', key: 'nav.major' },
  { path: '/note', icon: 'Notebook', key: 'nav.note' },
  { path: '/message', icon: 'ChatDotRound', key: 'nav.message' },
  { path: '/group', icon: 'UserFilled', key: 'nav.group' },
  { path: '/cloud', icon: 'FolderOpened', key: 'nav.cloud' },
  { path: '/contact', icon: 'Phone', key: 'nav.contact' },
]

const go = (index) => router.push(index)
</script>
