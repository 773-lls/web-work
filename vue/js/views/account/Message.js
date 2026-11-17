window.ProfileView = {
    name: 'ProfileView',

    setup() {
        const { t } = window.useI18n();
        const store = window.userStore;

        const formRef = Vue.ref(null);

        const form = Vue.reactive({
            name: store.name,
            id: store.id,
            gender: store.gender,
            phone: store.phone,
            company: store.company,
        });

        const rules = Vue.computed(() => ({
            name: [{ required: true, message: t('profile.required'), trigger: 'blur' }],
            id: [{ required: true, message: t('profile.required'), trigger: 'blur' }],
            phone: [{ required: true, message: t('profile.required'), trigger: 'blur' }],
        }));

        return {t, store, form, rules, formRef};
    },

    template: `
        <el-form :model="form"  label-width="110px" class="form-panel" hide-required-asterisk>
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

            <el-form-item :label="t('profile.phone')">
                <el-input v-model="form.phone" />
            </el-form-item>

            <el-form-item :label="t('profile.company')">
                <el-input v-model="form.company" :placeholder="t('profile.addCompany')" />
            </el-form-item>

            <el-divider />

            <div class="org-list">
                <div v-for="(org, index) in store.orgs" :key="index" class="org-item">
                    <div class="org-item__name">{{ org.name }}</div>
                    <div class="org-item__no">{{ t('profile.studentId') }}：{{ org.no }}</div>
                </div>
            </div>
        </el-form>
    `,
};
