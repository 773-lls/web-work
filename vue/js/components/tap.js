window.AccountMenu = {
    name: 'AccountMenu',

    setup() {
        const { t } = window.useI18n();
        const route = VueRouter.useRoute();
        const router = window.router;

        const items = [
            { path: '/account/profile', key: 'account.profile' },
            { path: '/account/avatar', key: 'account.avatar' },
            { path: '/account/password', key: 'account.password' },
            { path: '/account/delete', key: 'account.delete' },
            { path: '/account/language', key: 'account.language' },
        ];

        const go = (index) => router.push(index);

        return { t, route, items, go };
    },

    template: `
        <el-menu
            class="account-menu"
            mode="horizontal"
            :default-active="route.path"
            :ellipsis="false"
            @select="go"
        >
            <el-menu-item v-for="item in items" :key="item.path" :index="item.path">
                {{ t(item.key) }}
            </el-menu-item>
        </el-menu>
    `,
};
