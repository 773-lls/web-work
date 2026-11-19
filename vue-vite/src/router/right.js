import { createRouter, createWebHashHistory } from 'vue-router'

import { appStore } from '@/stores/language.js'
import { I18N } from '@/directory/directory.js'

import Buttonview from '@/views/buttonview.vue'
import AccountLayout from '@/views/account/AccountLayout.vue'
import Profile from '@/views/account/Profile.vue'
import Head from '@/views/account/Head.vue'
import Password from '@/views/account/Password.vue'
import Forget from '@/views/account/Forget.vue'
import Delete from '@/views/account/Delete.vue'
import Language from '@/views/account/Language.vue'

const routes = [
  { path: '/', redirect: '/home' },

  { path: '/home', name: 'home', component: Buttonview, meta: { titleKey: 'nav.home', color: '#f56c6c' } },
  { path: '/common', component: Buttonview, meta: { titleKey: 'nav.common', color: '#fadb14' } },
  { path: '/app', component: Buttonview, meta: { titleKey: 'nav.app', color: '#409eff' } },
  { path: '/course', component: Buttonview, meta: { titleKey: 'nav.course', color: '#67c23a' } },
  { path: '/major', component: Buttonview, meta: { titleKey: 'nav.major', color: '#adff2f' } },
  { path: '/note', component: Buttonview, meta: { titleKey: 'nav.note', color: '#696969' } },
  { path: '/message', component: Buttonview, meta: { titleKey: 'nav.message', color: '#bc8f8f' } },
  { path: '/group', component: Buttonview, meta: { titleKey: 'nav.group', color: '#4169e1' } },
  { path: '/cloud', component: Buttonview, meta: { titleKey: 'nav.cloud', color: '#8b4513' } },
  { path: '/contact', component: Buttonview, meta: { titleKey: 'nav.contact', color: '#8b4513' } },


  {
    path: '/account',
    component: AccountLayout,
    redirect: '/account/profile',
    meta: { titleKey: 'account.title' },
    children: [
      { path: 'profile', component: Profile, meta: { titleKey: 'account.profile' } },
      { path: 'avatar', component: Head, meta: { titleKey: 'account.avatar' } },
      { path: 'password', component: Password, meta: { titleKey: 'account.password' } },
      { path: 'forget', component: Forget, meta: { titleKey: 'password.forget' } },
      { path: 'delete', component: Delete, meta: { titleKey: 'account.delete' } },
      { path: 'language', component: Language, meta: { titleKey: 'account.language' } },
    ],
  },

  { path: '/:pathMatch(.*)*', redirect: '/home' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export function applyRouteTitle(route) {
  const dict = I18N[appStore.locale] || I18N.zh
  const title = dict[route.meta && route.meta.titleKey]
  document.title = title ? title + ' - 校园服务平台' : '校园服务平台'
}

router.afterEach((to) => applyRouteTitle(to))

export default router
