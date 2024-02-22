import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import './assets/reset.css';
import { createI18n } from 'vue-i18n';

import { messages } from './assets/i18n';

const browserLanguage = (
  navigator.language || navigator.browserLanguage
).toLowerCase();

const lang = browserLanguage.includes('zh') ? 'zh' : 'en';

const app = createApp(App);
const i18n = createI18n({
  legacy: false,
  locale: lang,
  messages,
  fallbackLocale: 'en',
});

app.use(ElementPlus);
app.use(i18n);
app.mount('#app');
