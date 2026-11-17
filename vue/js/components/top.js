window.TopBar = {
    name: 'TopBar',

    setup() {
        const { t } = window.useI18n();
        const store = window.userStore;
        const router = window.router;

        const invite = Vue.ref('');

        const goAccount = () => router.push('/account/profile');

        return { t, store, invite, goAccount };
    },

    template: `
        <div class="top">
            <div class="top__left">
                <span>{{ t('top.school') }}</span>
            </div>

            <div class="top__right">
                <el-input
                    v-model="invite"
                    class="top__invite"
                    size="small"
                    :placeholder="t('top.invite')"
                    clearable
                />

                <el-tooltip :content="t('account.title')" placement="bottom">
                    <button class="top__head" type="button" @click="goAccount">
                        <el-avatar :size="34" :src="store.avatar" />
                    </button>
                </el-tooltip>

                <el-dropdown>
                    <span class="top__user">
                        {{ store.name }}
                        <el-icon><ArrowDown /></el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="logout">{{ t('top.logout') }}</el-dropdown-item>
                            <el-dropdown-item command="switch" divided>{{ t('top.switch') }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    `,
};
