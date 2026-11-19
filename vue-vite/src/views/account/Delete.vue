<template>
  <div class="form-panel">
    <el-input
      v-model="reason"
      type="textarea"
      :rows="5"
      maxlength="200"
      show-word-limit
      :placeholder="t('delete.placeholder')"
    />

    <div class="mt16">
      <el-button type="danger" plain @click="onDelete">{{ t('delete.action') }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from '@/directory/directory.js'

const { t } = useI18n()
const reason = ref('')

const onDelete = async () => {
  try {
    await ElMessageBox.confirm(t('delete.confirmText'), t('delete.confirmTitle'), {
      type: 'warning',
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
    })
    ElMessage.success(t('delete.success'))
  } catch (e) {
    ElMessage.info(t('delete.cancelMsg'))
  }
}
</script>
