<template>
  <div class="nav">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { jwtDecode } from 'jwt-decode'

const getAccessToken = (): string | null => {
  return localStorage.getItem('access')
}

onMounted(() => {
  const userStore = useUserStore()
  const token = getAccessToken()
  if (token) {
    const decodedToken: any = jwtDecode(token)
    const { id, username } = decodedToken
    userStore.setUser({ id, username })
  }
})
</script>

<style lang="scss" scoped>
.nav {
  background-color: lightgray;
  color: white;
  padding: 10px;
}
</style>
