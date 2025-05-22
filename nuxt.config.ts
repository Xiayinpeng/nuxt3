// nuxt.config.ts
export default defineNuxtConfig({
    devtools: { enabled: true },
    routeRules: {
        '/': { isr: 60 },
        '/ssg': { static: true },
        '/ssr': { ssr: true }, // 修改为 ssr: true
        '/swr': { swr: 3600 }, // 使用正确的 swr 配置
        '/isr': { isr: 60 },
    },
    nitro: {
        // 移除 preset: 'static' 配置
        preset: 'node-server',
        devProxy: {
            // ... 现有代码 ...
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
        storage: {
            'cache': {
                driver: 'fs',
                base: './.output/cache/'
            }
        }
    }
})

