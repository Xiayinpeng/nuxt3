const num = ref(0)

export const countNum = () => {
  num.value++
  return num.value
}