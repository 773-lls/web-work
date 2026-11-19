<template>
  <div class="tap">
    <h2 class="tap__title">
      <img alt="账号管理图像" class="tap__logo" :src="stores.tapAvatar" />
      <span>{{ t('account.title') }}</span>
    </h2>

    <Tap />

    <div class="tap__panel">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Tap from '@/components/Tap.vue'
import { useI18n } from '@/directory/directory.js'
import {userStore as stores } from "@/stores/user.js"

const { t } = useI18n()
</script>
