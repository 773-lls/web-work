window.SideNav = {
    name: 'SideNav',

    setup() {
        const { t } = window.useI18n();
        const store = window.userStore;
        const appStore = window.appStore;
        const route = VueRouter.useRoute();
        const router = window.router;

        const items = [
            { path: '/home', icon: 'HomeFilled', key: 'nav.home' },
            { path: '/common', icon: 'Star', key: 'nav.common' },
            { path: '/app', icon: 'Grid', key: 'nav.app' },
            { path: '/course', icon: 'Reading', key: 'nav.course' },
            { path: '/major', icon: 'Collection', key: 'nav.major' },
            { path: '/note', icon: 'Notebook', key: 'nav.note' },
            { path: '/message', icon: 'ChatDotRound', key: 'nav.message' },
            { path: '/group', icon: 'UserFilled', key: 'nav.group' },
            { path: '/cloud', icon: 'FolderOpened', key: 'nav.cloud' },
            { path: '/contact', icon: 'Phone', key: 'nav.contact' },
        ];

        const activePath = Vue.computed(() => route.path);

        const go = (index) => router.push(index);

        return { t, store, appStore, items, activePath, go };
    },

    template: `
        <aside class="side">
            <div class="side__head">
                <el-avatar :size=56 :src="store.avatar" />
                <span class="side__name">{{ store.name }}</span>
            </div>

            <el-menu
                class="side__button"
                :default-active="activePath"
                @select="go"
            >
                <el-menu-item v-for="item in items" :key="item.path" :index="item.path">
                    <el-icon><component :is="item.icon" /></el-icon>
                    <template #title>{{ t(item.key) }}</template>
                </el-menu-item>
            </el-menu>

            <div class="side__footer">
                <el-button text circle>
                    <el-icon>
                        <component :is="appStore.collapsed ? 'DArrowRight' : 'DArrowLeft'" />
                    </el-icon>
                </el-button>
            </div>
        </aside>
    `,
};
