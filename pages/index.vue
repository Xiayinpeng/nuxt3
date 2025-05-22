<template>
  <div class="container">
    <!-- <h1>{{ data.data.evt_info.cn_name }}</h1> -->
    <h1>生成时间: {{ data.time }}</h1>
    <nav>
      <NuxtLink to="/ssg" class="nav-link">SSG页面</NuxtLink>
      <NuxtLink to="/ssr" class="nav-link">SSR页面</NuxtLink>
      <NuxtLink to="/isr" class="nav-link">ISR页面</NuxtLink>
      <NuxtLink to="/swr" class="nav-link">SWR页面</NuxtLink>
    </nav>
    <div class="description">
      <p>这是一个展示Nuxt3不同渲染策略的演示项目：</p>
      <ul>
        <li>SSG - 静态生成，适用于内容固定的页面</li>
        <li>SSR - 服务器端渲染，适用于需要实时数据的页面</li>
        <li>ISR - 增量静态再生成，每3600秒更新一次</li>
        <li>SWR - 过时时重新验证，在显示缓存内容的同时更新数据</li>
      </ul>
      <hello />
    </div>
  </div>
</template>
<script setup>
// const { data } = await useFetch('http://test.api.pokekara.com/xevent/event_info', {
//     params: {
//         evt_id: 10001113,
//         evt_sub: 0,
//         __uid__: 'u1542120744520855552'
//     }
// })
// 使用 useAsyncData 而不是 useFetch
const { data } = await useAsyncData('time-data', () => $fetch('/api/time'), {
  watch: [], // 不监听任何响应式数据变化
  server: true,
  // 使用 swr 策略
  cache: 'force-cache'
})

</script>
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

nav {
  margin: 20px 0;
  display: flex;
  gap: 15px;
}

.nav-link {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #45a049;
}

.description {
  margin-top: 30px;
}

ul {
  margin-top: 10px;
}

li {
  margin: 8px 0;
}
</style>