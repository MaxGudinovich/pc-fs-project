<template>
  <div class="userAccountContainer">
    <div class="userAccount">
      <h1>Account</h1>
      <div class="userAccountInfo">
        <p>Username: {{ userStore.user.username }}</p>
        <p>Role: {{ userStore.user.role }}</p>
      </div>
      <div class="userAccountActions">
        <button @click="handleLogout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  userStore.setUser({ id: 0, username: '', role: '' })
  router.push('/')
}
</script>

<style scoped></style>
