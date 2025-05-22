module.exports = {
    apps: [{
      name: 'nuxt3_demo',
      exec_mode: 'cluster',
      instances: 'max', // 或设置为具体数字
      script: './.output/server/index.mjs',
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
        NITRO_PRESET: 'node-server',
        // 启用缓存
        NITRO_STORAGE_CACHE_DRIVER: 'fs',
        NITRO_STORAGE_CACHE_BASE: './.output/cache/'
      }
    }]
  }