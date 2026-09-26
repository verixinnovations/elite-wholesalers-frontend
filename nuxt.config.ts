// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@compodium/nuxt',
    '@nuxtjs/algolia',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    '@vite-pwa/nuxt',
    // 'nuxt-google-auth',
    'nuxt-gtag',
    'nuxt-security',
    // 'nuxt-vue3-google-signin',
    'nuxt-zod',
    'v-gsap-nuxt',

    'nuxt-swiper'
  ],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      titleTemplate: 'Elite Wholesalers | %s ',
      link: [{ rel: 'icon', type: 'image/png', href: '/logo-sm.png' }]
    }
  },

  css: ['~/assets/css/main.css'],

  ui: {
    colorMode: false
  },

  runtimeConfig: {
    licenseAuthBasic: '',
    licenseTokenUrl:
      'https://api.onegov.nsw.gov.au/oauth/client_credential/accesstoken?grant_type=client_credentials',
    licenseVerifyUrl: 'https://api.onegov.nsw.gov.au/tradesregister/v1/verify',
    public: {
      abnGuid: 'be36ee64-1c2c-42f3-99c0-777cc9281531'
    }
  },

  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': [
          "'self'",
          'data:',
          'http://localhost:3000',
          'https://picsum.photos/',
          'https://fastly.picsum.photos/'
        ]
      }
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/**': {
      headers: {
        'Content-Security-Policy': "img-src 'self' data: http://localhost:3000;"
      }
    }
  },

  compatibilityDate: '2026-06-30',

  vite: {
    optimizeDeps: {
      exclude: ['swiper/element/bundle']
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    customCollections: [
      {
        prefix: 'icon',
        dir: './app/assets/icons'
      }
    ]
  },

  piniaPluginPersistedstate: {
    storage: 'cookies',
    cookieOptions: {
      sameSite: 'strict',
      maxAge: 3600 * 24 * 7 // 1 week
    }
  }
})
