import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { LocalNotifications } from '@capacitor/local-notifications'
import { IonicVue } from '@ionic/vue';
import { Preferences } from '@capacitor/preferences'
import { powiadomienie } from './powiadomienia';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});

// Uprawnienia do powiadomień
LocalNotifications.requestPermissions().then(result => {
  if (result.display === 'granted') {
    powiadomienie()
  }
});

Preferences.set({
  key: 'lastOpen',
  value: new Date().toISOString()
});