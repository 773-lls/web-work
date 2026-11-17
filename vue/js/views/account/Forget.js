window.ForgetView = {
    name: 'ForgetView',

    setup() {
        const { t } = window.useI18n();
        const router = window.router;

        const formRef = Vue.ref(null);
        const form = Vue.reactive({ phone: '', code: '', newPwd: '' });
        const counting = Vue.ref(0);
        let timer = null;

        const rules = Vue.computed(() => ({
            phone: [
                { required: true, message: t('password.required'), trigger: 'blur' },
                { pattern: /^1[3-9]\d{9}$/, message: t('forget.phoneRule'), trigger: 'blur' },
            ],
            newPwd: [
                { required: true, message: t('password.required'), trigger: 'blur' },
                { min: 6, message: t('password.tooShort'), trigger: 'blur' },
            ],
        }));

        const submit = async () => {
            const ok = await formRef.value.validate().catch(() => false);
            if (!ok) return;
            ElMessage.success(t('forget.success'));
            router.push('/account/password');
        };

        Vue.onUnmounted(() => {
            if (timer) clearInterval(timer);
        });

        return { t, form, rules, formRef, counting, submit };
    },

    template: `
        <div class="form-panel">

            <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" hide-required-asterisk>
                <el-form-item :label="t('forget.phone')" prop="phone">
                    <el-input v-model="form.phone" maxlength="11" />
                </el-form-item>

                <el-form-item :label="t('forget.code')" prop="code">
                    <div class="code-row">
                        <el-input v-model="form.code" maxlength="6" />
                        <el-button
                            :disabled="counting > 0"
                            @click="sendCode"
                        >
                            {{ counting > 0 ? counting + 's' : t('forget.getCode') }}
                        </el-button>
                    </div>
                </el-form-item>

                <el-form-item :label="t('forget.newPwd')" prop="newPwd">
                    <el-input v-model="form.newPwd" type="password" show-password />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submit">{{ t('common.confirm') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    `,
};
