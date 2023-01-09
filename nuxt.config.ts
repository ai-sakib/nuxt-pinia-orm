// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt', 
        '@pinia-orm/nuxt'
    ],
    css: [
        '~/assets/css/main.css',
        '~/assets/css/transition.css'
    ],
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
    },
    app: {
        head: {
            charset: 'utf-16',
            viewport: 'width=500, initial-scale=1',
            title: 'Nuxt Pinia',
            meta: [
                { name: 'description', content: 'Todo List' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/images/nuxt.svg' }
            ]
        },
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' }
    },
  
})
