import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import { registerPlugins } from '@/plugins'

import 'vuetify/styles'; // Importez le fichier de styles global de Vuetify

import App from './App.vue';

import VarelaFont from '@/assets/VarelaRound-Regular.ttf';

const app = createApp(App);

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark', // Choisissez le thème par défaut (dark ou light)
    themes: {
      dark: {
        fonts: {
          body: {
            family: VarelaFont,
          },
          heading: {
            family: VarelaFont,
          },
        },
      },
    },
  },
});

app.use(vuetify);

registerPlugins(app)
app.mount('#app');
