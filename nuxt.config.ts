// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@compodium/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/seo',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-gtag',
    'nuxt-security',
    'nuxt-swiper',
    '@vueuse/nuxt',
    '@nuxt/scripts'
  ],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      charset: 'utf-8',
      titleTemplate: 'Elite Wholesalers | %s ',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' }
      ]
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
        'default-src': ["'self'"],
        'img-src': [
          "'self'",
          'data:',
          'http://localhost:5050',
          'https://cdn1.zohoecommerce.com',
          'https://elite-wholesalers-frontend.vercel.app',
          'https://www.elitewholesalers.com.au',
          'https://native.elitewholesalers.com.au',
          'http://api.elitewholesalers.com.au',
          'https://www.youtube.com'
        ],
        'frame-src': ["'self'", 'https://www.youtube.com', 'https://www.youtube-nocookie.com'],
        'connect-src': [
          "'self'",
          'http://localhost:5050',
          'http://api.elitewholesalers.com.au',
          // 'https:*.google-analytics.com',
          // 'https*.analytics.google.com',
          process.env.VITE_API_URL || ''
        ].filter(Boolean),
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          'https://www.youtube.com',
          'https://s.ytimg.com'
        ],
        'script-src-elem': [
          "'self'",
          "'unsafe-inline'",
          'https://www.youtube.com',
          'https://s.ytimg.com'
        ],
        'script-src-attr': ["'unsafe-inline'"], // Fixes the inline event handler error
        'style-src': ["'self'", "'unsafe-inline'"]
      }
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/dashboard/**': { ssr: false }
  },
  site: {
    url: 'https://www.elitewholesalers.com.au',
    name: 'Elite Wholesalers',
    description: 'Australia’s trusted source for security, networking & electronics devices.',
    defaultLocale: 'en-AU'
  },

  robots: {
    groups: [
      {
        userAgent: ['*'],
        allow: ['/'],
        disallow: ['/dashboard', '/cart', '/checkout']
      }
    ]
  },
  seo: {},

  // gtag: {
  //   id: process.env.NUXT_PUBLIC_GTAG_ID || 'G-XXXXXXXXXX'
  // },

  compatibilityDate: '2026-06-30',

  vite: {
    optimizeDeps: {
      exclude: ['swiper/element/bundle']
    }
  },

  nitro: {
    externals: {
      inline: ['zod']
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
