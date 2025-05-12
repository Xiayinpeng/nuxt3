import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: 'http://test.api.pokekara.com',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    withCredentials: false, // 修改为false，避免CORS问题
  })

  nuxtApp.provide('axios', instance)
})
