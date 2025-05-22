// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    routeRules: {
        '/': { prerender: true },
        '/isr': { isr: 3600 },
        '/ssr': { ssr: true },
        '/swr': { swr: 3600 },
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
        },
        // 配置缓存存储
        storage: {
            'cache': {
            driver: 'fs', // 使用文件系统作为缓存驱动
            base: './.output/cache/' // 缓存目录
        }
      },
    },
    // 移除 @nuxtjs/proxy 相关配置
})
