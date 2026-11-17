window.LanguageView = {
    name: 'LanguageView',

    setup() {
        const { t } = window.useI18n();
        const appStore = window.appStore;

        const change = async(value) => {
            appStore.locale = value;
            await window.router.push('/account/profile').catch(()=>{});
            window.applyRouteTitle(window.router.currentRoute.value);
            ElMessage.success(t('common.saved'));
        };

        return { t, appStore, change };
    },

    template: `
        <div class="form-panel">
            <el-radio-group :model-value="appStore.locale" @change="change">
                <el-radio value="zh" border>{{ t('language.cn') }}</el-radio>
                <el-radio value="en" border>{{ t('language.en') }}</el-radio>
            </el-radio-group>
        </div>
    `,
};
