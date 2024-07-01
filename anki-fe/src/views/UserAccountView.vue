<template>
  <div class="userAccountContainer">
    <h1 class="userAccountContainer--title">Account</h1>
    <p class="userAccountContainer--username">Username: {{ userStore.user.username }}</p>
    <p class="userAccountContainer--role" v-if="userStore.user.role === 'admin'">
      Role: {{ userStore.user.role }}
    </p>
    <PrimaryButton class="userAccountContainer--btn" @click="handleLogout">Logout</PrimaryButton>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import PrimaryButton from '@/ui/PrimaryButton.vue'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  userStore.setUser({ id: 0, username: '', role: '' })
  router.push('/')
}
</script>

<style lang="scss" scoped>
.userAccountContainer {
  padding: 50px 15%;

  &--title {
    font-size: 24px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--gray-300);
  }

  &--username {
    font-size: 18px;
    margin-bottom: 20px;
  }

  &--role {
    font-size: 18px;
    margin-bottom: 20px;
  }

  &--btn {
    margin-top: 20px;
  }
}
</style>
