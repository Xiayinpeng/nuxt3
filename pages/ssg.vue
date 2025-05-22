<template>
  <div class="container">
    <Hello></Hello>
    <h1>SSG (Static Site Generation) 页面</h1>
    <p>这个页面在构建时生成，适用于内容不经常变化的静态页面。</p>
    <p>生成时间: {{ generatedTime }}</p>
    <p>访问次数: {{ num }}</p>
  </div>
</template>

<script setup>
const generatedTime = new Date().toLocaleString()
const num = countNum()
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>