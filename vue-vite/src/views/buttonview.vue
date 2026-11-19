<template>
  <section class="button">
    <div class="placeholder__bar" :style="{ background: route.meta.color || '#6053b7' }"></div>
    <h2 class="placeholder__title">{{ t(route.meta.titleKey) }}</h2>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useI18n } from '@/directory/directory.js'

const { t } = useI18n()
const route = useRoute()
</script>
