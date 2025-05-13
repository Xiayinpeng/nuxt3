<template>
  <div class="container">
    <h1>SWR (Stale While Revalidate) 页面</h1>
    <p>这个页面使用SWR策略，在显示缓存内容的同时在后台更新数据。</p>
    <p>页面生成时间: {{ generatedTime }}</p>
    <p>访问次数: {{ num }}</p>
  </div>
</template>

<script setup>
const generatedTime = new Date().toLocaleString()
const num = countNum()
// 使用useFetch实现SWR策略
const { data } = await useFetch('/api/time', {
  key: 'time-data',
  staleTime: 3600000, // 3600秒后数据过期
  cache: 'force-cache'
})
console.log(data);


// 更新显示时间
onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date().toLocaleString()
  }, 1000)
})

// 监听数据变化
watch(data, () => {
  updateTime.value = new Date().toLocaleString()
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>