<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="110px"
    class="form-panel"
    hide-required-asterisk
  >
    <el-form-item :label="t('password.old')" prop="used">
      <el-input v-model="form.used" type="password" show-password :placeholder="t('password.input')" />
    </el-form-item>

    <el-form-item :label="t('password.new')" prop="next">
      <el-input v-model="form.next" type="password" show-password :placeholder="t('password.input')" />
    </el-form-item>

    <el-form-item :label="t('password.confirm')" prop="assure">
      <el-input v-model="form.assure" type="password" show-password :placeholder="t('password.input')" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">{{ t('common.confirm') }}</el-button>
      <el-button link type="primary" @click="goForget">{{ t('password.forget') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useI18n } from '@/directory/directory.js'

const { t } = useI18n()
const router = useRouter()
const formRef = ref(null)

const form = reactive({ used: '', next: '', assure: '' })

const validateAssure = (rule, value, callback) => {
  if (!value) return callback(new Error(t('password.required')))
  if (value !== form.next) return callback(new Error(t('password.notMatch')))
  callback()
}

const rules = computed(() => ({
  used: [
    { required: true, message: t('password.required'), trigger: 'blur' },
    { min: 6, message: t('password.tooShort'), trigger: 'blur' },
  ],
  next: [
    { required: true, message: t('password.required'), trigger: 'blur' },
    { min: 6, message: t('password.tooShort'), trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value && value === form.used) return callback(new Error(t('password.sameAsOld')))
        callback()
      },
      trigger: 'blur',
    },
  ],
  assure: [{ validator: validateAssure, trigger: 'blur' }],
}))

const submit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    ElMessage.success(t('password.success'))
    formRef.value.resetFields()
  })
}

const goForget = () => router.push('/account/forget')
</script>
