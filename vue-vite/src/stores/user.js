import { reactive } from 'vue'

import headUrl from '@/assets/head.png'
import blueUrl from '@/assets/blue.png'

export const userStore = reactive({
  name: '覃青山',
  id: '301692714',
  gender: 'male',
  phone: '177****0053',
  company: '重庆理工大学',
  avatar: headUrl,
  tapAvatar: blueUrl,
  orgs: [
    { name: '重庆理工大学', no: '12323020301' },
    { name: '重庆理工大学图书馆', no: '12323020301' },
  ],
})
