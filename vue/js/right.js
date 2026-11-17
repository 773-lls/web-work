(function () {
    const Placeholder = window.PlaceholderView;

    const routes = [
        { path: '/', redirect: '/home' },

        {
            path: '/home',
            name: 'home',
            component: window.HomeView,
            meta: { titleKey: 'nav.home' },
        },

        { path: '/common', component: Placeholder, meta: { titleKey: 'nav.common', color: '#fadb14' } },
        { path: '/app', component: Placeholder, meta: { titleKey: 'nav.app', color: '#409eff' } },
        { path: '/course', component: Placeholder, meta: { titleKey: 'nav.course', color: '#67c23a' } },
        { path: '/major', component: Placeholder, meta: { titleKey: 'nav.major', color: '#adff2f' } },
        { path: '/note', component: Placeholder, meta: { titleKey: 'nav.note', color: '#696969' } },
        { path: '/message', component: Placeholder, meta: { titleKey: 'nav.message', color: '#bc8f8f' } },
        { path: '/group', component: Placeholder, meta: { titleKey: 'nav.group', color: '#4169e1' } },
        { path: '/cloud', component: Placeholder, meta: { titleKey: 'nav.cloud', color: '#8b4513' } },
        { path: '/contact', component: Placeholder, meta: { titleKey: 'nav.contact', color: '#8b4513' } },

        {
            path: '/account',
            component: window.AccountLayout,
            redirect: '/account/profile',
            meta: { titleKey: 'account.title' },
            children: [
                { path: 'profile', component: window.ProfileView, meta: { titleKey: 'account.profile' } },
                { path: 'avatar', component: window.AvatarView, meta: { titleKey: 'account.avatar' } },
                { path: 'password', component: window.PasswordView, meta: { titleKey: 'account.password' } },
                { path: 'forget', component: window.ForgetView, meta: { titleKey: 'password.forget' } },
                { path: 'delete', component: window.DeleteView, meta: { titleKey: 'account.delete' } },
                { path: 'language', component: window.LanguageView, meta: { titleKey: 'account.language' } },
            ],
        },

        { path: '/:pathMatch(.*)*', redirect: '/home' },
    ];

    window.router = VueRouter.createRouter({
        history: VueRouter.createWebHashHistory(),
        routes,
    });

    window.applyRouteTitle = (path) => {
        const locale = (window.appStore && window.appStore.locale) || 'zh';
        const dict = window.I18N[locale] || window.I18N.zh;
        const title = dict[path.meta && path.meta.titleKey];
        document.title = title ? title + ' - 校园服务平台' : '校园服务平台';
    };

    window.router.afterEach(window.applyRouteTitle);
})();
