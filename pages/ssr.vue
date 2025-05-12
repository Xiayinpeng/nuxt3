<template>
  <div class="container">
    <h1>SSR (Server Side Rendering) 页面</h1>
    <p>这个页面在每次请求时都会在服务器端重新渲染。</p>
    <p>服务器渲染时间: {{ serverTime }}</p>
    <p>当前访问次数: {{ visitCount }}</p>
  </div>
</template>

<script setup>
const serverTime = new Date().toLocaleString()
const visitCount = ref(0)
const num = countNum()
console.log(num)
onMounted(() => {
  visitCount.value++
})

// 设置该页面为SSR模式（这是Nuxt的默认行为，可以省略）
definePageMeta({})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>