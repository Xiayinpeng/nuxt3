<template>
  <div class="container">
    <h1>ISR (Incremental Static Regeneration) 页面</h1>
    <p>这个页面会在后台定期重新生成，保持数据的相对新鲜。</p>
    <p>页面生成时间: {{ data.time }}</p>
    <p>访问次数: {{ num }}</p>
  </div>
</template>

<script setup>
const num = countNum()
// 使用 useAsyncData 而不是 useFetch
const { data } = await useAsyncData('time-data', () => {
  return {
    time: new Date().toLocaleString(),
    timestamp: Date.now()
  }
}, { 
  server: true // 确保只在服务器端执行
})


</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>