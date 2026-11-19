<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="110px"
    class="form-panel"
    hide-required-asterisk
  >
    <el-form-item :label="t('profile.name')">
      <el-input v-model="form.name" readonly/>
    </el-form-item>

    <el-form-item :label="t('profile.id')">
      <el-input v-model="form.id" readonly/>
    </el-form-item>

    <el-form-item :label="t('profile.gender')">
      <el-radio-group v-model="form.gender">
        <el-radio value="male">{{ t('profile.male') }}</el-radio>
        <el-radio value="female">{{ t('profile.female') }}</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item :label="t('profile.phone')" prop="phone">
      <el-input v-model="form.phone" />
    </el-form-item>

    <el-form-item :label="t('profile.company')">
      <el-input v-model="form.company" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="save">{{ t('common.save') }}</el-button>
      <el-button @click="reset">{{ t('common.reset') }}</el-button>
    </el-form-item>
  </el-form>

  <el-divider />

  <div class="org-list">
    <div v-for="(org, index) in store.orgs" :key="index" class="org-item">
      <div class="org-item__name">{{ org.name }}</div>
      <div class="org-item__no">{{ t('profile.studentId') }}：{{ org.no }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from '@/directory/directory.js'
import { userStore as store } from '@/stores/user'

const { t } = useI18n()
const formRef = ref(null)

const form = reactive({
  name: store.name,
  id: store.id,
  gender: store.gender,
  phone: store.phone,
  company: store.company,
})

const rules = computed(() => ({
  name: [{ required: true, message: t('profile.required'), trigger: 'blur' }],
  id: [{ required: true, message: t('profile.required'), trigger: 'blur' }],
  phone: [
    { required: true, message: t('profile.required'), trigger: 'blur' },
    { pattern: /^\d{3}\*{4}\d{4}$|^\d{11}$/, message: t('forget.phoneRule'), trigger: 'blur' },
  ],
}))

const save = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    Object.assign(store, form)
    ElMessage.success(t('common.saved'))
  })
}

const reset = () => {
  form.name = store.name
  form.id = store.id
  form.gender = store.gender
  form.phone = store.phone
  form.company = store.company
  formRef.value.clearValidate()
}
</script>
