export default defineEventHandler(() => {
  return {
    time: new Date().toLocaleString(),
    timestamp: Date.now()
  }
})