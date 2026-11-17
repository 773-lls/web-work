(function () {
    const App = {
        name: 'App',
        template: `
            <div class="Top">
                <top-bar />
                <div class="Left">
                    <side-nav />
                    <main class="Right">
                        <router-view />
                    </main>
                </div>
            </div>
        `,
    };

    const app = Vue.createApp(App);

    if (typeof ElementPlusIconsVue !== 'undefined') {
        Object.entries(ElementPlusIconsVue).forEach(([name, component]) => {
            app.component(name, component);
        });
    }

    app.component('TopBar', window.TopBar);
    app.component('SideNav', window.SideNav);
    app.component('AccountMenu', window.AccountMenu);

    app.use(window.router);
    app.use(ElementPlus, { locale: ElementPlusLocaleZhCn });

    app.mount('#app');
})();
