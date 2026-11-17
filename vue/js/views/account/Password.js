window.PasswordView = {
    name: 'PasswordView',

    setup() {
        const { t } = window.useI18n();
        const router = window.router;

        const formRef = Vue.ref(null);
        const form = Vue.reactive({ oldPwd: '', newPwd: '', confirmPwd: '' });

        const rules = Vue.computed(() => ({
            oldPwd: [
                { required: true, message: t('password.required'), trigger: 'blur' },
            ],
            newPwd: [
                { required: true, message: t('password.required'), trigger: 'blur' },
                { min: 6, message: t('password.tooShort'), trigger: 'blur' },
                {
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                        if (value && value === form.oldPwd) {
                            callback(new Error(t('password.sameAsOld')));
                        } else {
                            callback();
                        }
                    },
                },
            ],
            confirmPwd: [
                { required: true, message: t('password.required'), trigger: 'blur' },
                {
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                        if (value && value !== form.newPwd) {
                            callback(new Error(t('password.notMatch')));
                        } else {
                            callback();
                        }
                    },
                },
            ],
        }));

        const goForget = () => router.push('/account/forget');

        return { t, form, rules, formRef, goForget };
    },

    template: `
        <div class="form-panel">
            <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" hide-required-asterisk>
                <el-form-item :label="t('password.old')" prop="oldPwd">
                    <el-input
                        v-model="form.oldPwd"
                        type="password"
                        show-password
                        :placeholder="t('password.input')"
                    />
                </el-form-item>

                <el-form-item :label="t('password.new')" prop="newPwd">
                    <el-input
                        v-model="form.newPwd"
                        type="password"
                        show-password
                        :placeholder="t('password.input')"
                    />
                </el-form-item>

                <el-form-item :label="t('password.confirm')" prop="confirmPwd">
                    <el-input
                        v-model="form.confirmPwd"
                        type="password"
                        show-password
                        :placeholder="t('password.input')"
                    />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submit">{{ t('common.confirm') }}</el-button>
                    <el-button link type="primary" @click="goForget">{{ t('password.forget') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    `,
};
