<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="110px"
    class="form-panel"
    hide-required-asterisk
  >
    <el-form-item :label="t('forget.phone')" prop="phone">
      <el-input v-model="form.phone" maxlength="11" :placeholder="t('forget.phone')" />
    </el-form-item>

    <el-form-item :label="t('forget.code')" prop="code">
      <div class="code-row">
        <el-input v-model="form.code" maxlength="4" :placeholder="t('forget.code')" />
        <el-button :disabled="counting" @click="sendCode">
          {{ counting ? `${seconds}s` : t('forget.getCode') }}
        </el-button>
      </div>
    </el-form-item>

    <el-form-item :label="t('forget.newPwd')" prop="password">
      <el-input v-model="form.password" type="password" show-password :placeholder="t('password.input')" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">{{ t('common.confirm') }}</el-button>
      <el-button @click="goBack">{{ t('common.cancel') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { computed, onUnmounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useI18n } from '@/directory/directory.js'

const { t } = useI18n()
const router = useRouter()
const formRef = ref(null)

const form = reactive({ phone: '', code: '', password: '' })

const seconds = ref(0)
const counting = computed(() => seconds.value > 0)
let timer = null

const rules = computed(() => ({
  phone: [
    { required: true, message: t('profile.required'), trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: t('forget.phoneRule'), trigger: 'blur' },
  ],
  code: [
    { required: true, message: t('profile.required'), trigger: 'blur' },
    { pattern: /^\d{4}$/, message: t('forget.codeRule'), trigger: 'blur' },
  ],
  password: [
    { required: true, message: t('password.required'), trigger: 'blur' },
    { min: 6, message: t('password.tooShort'), trigger: 'blur' },
  ],
}))

const sendCode = () => {
  formRef.value.validateField('phone', (valid) => {
    if (!valid) return

    ElMessage.success(t('forget.codeTip'))
    seconds.value = 60
    timer = setInterval(() => {
      seconds.value -= 1
      if (seconds.value <= 0) clearInterval(timer)
    }, 1000)
  })
}

const submit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    ElMessage.success(t('forget.success'))
    router.push('/account/password')
  })
}

const goBack = () => router.push('/account/password')

// 组件销毁时一定要清定时器，否则切页面后它还在跑
onUnmounted(() => clearInterval(timer))
</script>
