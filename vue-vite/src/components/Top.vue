<template>
  <div class="top">
    <div class="top__left">
      <span>{{ t('top.school') }}</span>
    </div>

    <div class="top__right">
      <el-input
        v-model="invite"
        class="top__invite"
        size="small"
        :placeholder="t('top.invite')"
        clearable
      />

      <el-tooltip :content="t('account.title')" placement="bottom">
        <button class="top__head" type="button" @click="goAccount">
          <el-avatar :size="34" :src="store.avatar" />
        </button>
      </el-tooltip>

      <el-dropdown @command="onCommand">
        <span class="top__user">
          {{ store.name }}
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">{{ t('top.logout') }}</el-dropdown-item>
            <el-dropdown-item command="switch" divided>{{ t('top.switch') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useI18n } from '@/directory/directory.js'
import { userStore as store } from '@/stores/user'

const { t } = useI18n()
const router = useRouter()

const invite = ref('')

const goAccount = () => router.push('/account/profile')

const onCommand = (command) => {
  ElMessage.info(command === 'logout' ? t('top.logoutTip') : t('top.switchTip'))
}
</script>
