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

    'nuxt-swiper',
    '@vueuse/nuxt/module',
    '@nuxt/scripts'
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

  runtimeConfig: {},

  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': [
          "'self'",
          "'unsafe-inline'",
          "'strict-dynamic'",
          'data:',
          'http://localhost:5050',
          'https://cdn1.zohoecommerce.com',
          'https://elite-wholesalers-frontend.vercel.app',
          'http://elite-wholesalers-backend.onrender.com',
          'https://elite-wholesalers-backend-production-89cc.up.railway.app',
          'https://picsum.photos/',
          'https://fastly.picsum.photos/',
          'https://useperch.xyz'
        ]
      }
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/dashboard/**': { ssr: false },
    '/**': {
      headers: {
        'Content-Security-Policy':
          "img-src 'self' data: http://localhost:5050 http://elite-wholesalers-backend.onrender.com https://elite-wholesalers-frontend.vercel.app https://elite-wholesalers-backend-production-89cc.up.railway.app cdn1.zohoecommerce.com https://picsum.photos https://fastly.picsum.photos;"
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
    storage: 'localStorage',
    cookieOptions: {
      sameSite: 'strict',
      maxAge: 3600 * 24 * 7 // 1 week
    }
  }
})
