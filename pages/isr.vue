<template>
  <div class="container">
    <h1>ISR (Incremental Static Regeneration) 页面</h1>
    <p>这个页面会在后台定期重新生成，保持数据的相对新鲜。</p>
    <p>页面生成时间: {{ generatedTime }}</p>
    <p>随机数据: {{ randomNumber }}</p>
  </div>
</template>

<script setup>
const generatedTime = new Date().toLocaleString()
const randomNumber = Math.floor(Math.random() * 1000)

// 设置该页面为ISR模式，revalidate时间为3600秒
definePageMeta({
  static: true
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>