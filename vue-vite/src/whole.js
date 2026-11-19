import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'element-plus/dist/index.css'
import '@/assets/index.css'

import Whole from './whole.vue'
import router from './router/right.js'

const app = createApp(Whole)

for (const [name, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, component)
}

app.use(router)
app.use(ElementPlus, { locale: zhCn })
app.mount('#app')
