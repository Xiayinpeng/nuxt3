<template>
  <div class="container">
    <h1>SSR (Server Side Rendering) 页面</h1>
    <h1>{{ eventData.evt_info.cn_name }}</h1>
    <p>这个页面在每次请求时都会在服务器端重新渲染。</p>
    <p>服务器渲染时间: {{ serverTime }}</p>
    <p>当前访问次数: {{ num }}</p>
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
// const eventData = data.value.data
const { data: eventData } = await useAsyncData('eventData', async() => {
  const { $axios } = useNuxtApp()
  // 使用自定义的 axios 实例发起请求
  const res = await $axios.get('/xevent/event_info', {
    params: {
        evt_id: 10001113,
        evt_sub: 0,
        __uid__: 'u1542120744520855552'
    }
  })
  return res.data.data
})



const serverTime = new Date().toLocaleString()
const num = countNum()

</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>