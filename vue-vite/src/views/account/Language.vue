<template>
  <div class="form-panel">
    <el-radio-group :model-value="appStore.locale" @change="change">
      <el-radio value="zh" border>{{ t('language.cn') }}</el-radio>
      <el-radio value="en" border>{{ t('language.en') }}</el-radio>
    </el-radio-group>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from '@/directory/directory.js'
import { appStore } from '@/stores/language.js'
import { applyRouteTitle } from '@/router/right.js'

const { t } = useI18n()
const router = useRouter()

const change = async (value) => {
  appStore.locale = value

  await router.push('/account/profile').catch(() => {})

  applyRouteTitle(router.currentRoute.value)

  ElMessage.success(t('common.saved'))
}
</script>
