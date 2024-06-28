<template>
  <div class="nav">
    <img src="../../public/svg-gobbler.png" alt="logo" class="nav--logo" @click="handleNavToHome" />
    <RouterLink to="/" class="nav--link">Groups</RouterLink>
    <RouterLink to="/add" class="nav--link">Add</RouterLink>
    <RouterLink to="/account" class="nav--link nav--link-last">Account</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { jwtDecode } from 'jwt-decode'

const router = useRouter()

const getAccessToken = (): string | null => {
  return localStorage.getItem('access')
}

onMounted(() => {
  const userStore = useUserStore()
  const token = getAccessToken()
  if (token) {
    const decodedToken: any = jwtDecode(token)
    const { id, username, role } = decodedToken
    userStore.setUser({ id, username, role })
  }
})

const handleNavToHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  gap: 40px;
  background-color: var(--gray-200);
  padding: 10px 15%;
  height: 70px;

  &--link {
    color: var(--gray-600);
    text-decoration: none;
    font-size: 20px;
    font-weight: 500;

    &-last {
      margin-left: auto;
    }

    &:hover {
      color: var(--gray-800);
    }
  }

  &--logo {
    cursor: pointer;
    width: 250px;
    height: 40px;
  }
}

.router-link-exact-active {
  color: var(--gray-800);
}
</style>
