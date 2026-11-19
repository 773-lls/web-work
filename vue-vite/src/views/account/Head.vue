<template>
  <div class="avatar-row">
    <div class="avatar-box">
      <div class="avatar-box__label">{{ t('avatar.preview') }}</div>
      <el-avatar :size="96" :src="preview || store.avatar" />
    </div>

    <div class="avatar-actions">
      <el-upload
        :auto-upload="false"
        :show-file-list="false"
        accept="image/*"
        :on-change="onChange"
      >
        <el-button>{{ t('avatar.choose') }}</el-button>
      </el-upload>

      <el-button type="primary" @click="save">{{ t('avatar.save') }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from '@/directory/directory.js'
import { userStore as store } from '@/stores/user'

const { t } = useI18n()
const preview = ref('')

const onChange = (file) => {
  const raw = file.raw

  if (!raw.type.startsWith('image/')) {
    ElMessage.error(t('avatar.notImage'))
    return
  }
  if (raw.size > 2 * 1024 * 1024) {
    ElMessage.error(t('avatar.tooLarge'))
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    preview.value = reader.result
  }
  reader.readAsDataURL(raw)
}

const save = () => {
  if (!preview.value) {
    ElMessage.warning(t('avatar.notImage'))
    return
  }
  store.avatar = preview.value
  ElMessage.success(t('avatar.success'))
}
</script>
