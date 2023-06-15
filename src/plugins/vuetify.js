/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

const darkTheme = {
  dark: true,
  colors: {
    background: '#272727',
    surface: '#575757',
    primary: '#81BEF8',
    secondary: '#FFCACA',
  }
}

const lightTheme = {
  dark: false,
}

export default createVuetify({
  theme: {
    // themes: {
    //   light: {
    //     colors: {
    //       primary: '#1867C0',
    //       secondary: '#5CBBF6',
    //     },
    //   },
    options: {
      customProperties: true,
    },
    fonts: {
      body: 'Varela Round',
      heading: 'Varela Round',
    },
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme,
    },
  },
})
