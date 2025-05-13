// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    routeRules: {
        '/': { prerender: true },
        '/isr': { isr: 60 },
        '/ssr': { ssr: true },
        '/swr': { swr: 60 },
    },
    nitro: {
        devProxy: {
            '/api': {
                target: 'https://test.api.pokekara.com',
                changeOrigin: true,
            },
            '/x': {
                target: 'https://test.api.pokekara.com',
                changeOrigin: true,
            },
            '/xevent': {
                target: 'https://test.api.pokekara.com',
                changeOrigin: true,
            },
            '/webkara': {
                target: 'https://test.api.pokekara.com',
                changeOrigin: true,
            }
        }
    },
    // 移除 @nuxtjs/proxy 相关配置
})
