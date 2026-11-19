<template>
  <el-menu
    class="account-menu"
    mode="horizontal"
    :default-active="route.path"
    @select="go"
  >
    <el-menu-item v-for="item in items" :key="item.path" :index="item.path">
      {{ t(item.key) }}
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '@/directory/directory.js'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const items = [
  { path: '/account/profile', key: 'account.profile' },
  { path: '/account/avatar', key: 'account.avatar' },
  { path: '/account/password', key: 'account.password' },
  { path: '/account/delete', key: 'account.delete' },
  { path: '/account/language', key: 'account.language' },
]

const go = (index) => router.push(index)
</script>
