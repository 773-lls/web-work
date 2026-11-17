window.AccountLayout = {
    name: 'AccountLayout',

    setup() {
        const { t } = window.useI18n();
        const store = window.userStore;
        const router = window.router;
        return { t ,store, router};
    },

    template: `
        <section class="tap">
            <div class="tap__title">
                <el-avatar :size="64" :src="store.tapAvatar" />
                <span>{{ t('account.title') }}</span>
            </div>

            <account-menu />

            <div class="tap__panel">
                <router-view />
            </div>
        </section>
    `,
};
