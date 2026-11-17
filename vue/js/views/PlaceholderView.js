window.PlaceholderView = {
    name: 'PlaceholderView',

    setup() {
        const { t } = window.useI18n();
        const route = VueRouter.useRoute();

        return { t, route };
    },

    template: `
        <section class="button">
            <div class="placeholder__bar" :style="{ background: route.meta.color || '#6053b7' }"></div>
            <h2 class="placeholder__title">{{ t(route.meta.titleKey) }}</h2>
        </section>
    `,
};
