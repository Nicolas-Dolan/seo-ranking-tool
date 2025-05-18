import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// @ts-expect-error: The linter is over-reacting
import PrimeVue from 'primevue/config'
import App from './App.vue'
import Aura from '@primeuix/themes/aura'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
    },
  },
})
app.directive('tooltip', Tooltip)

app.mount('#app')
