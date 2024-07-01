<template>
  <div v-if="isAuthenticated" class="protectedContainer">
    <slot />
  </div>
  <AuthAdminView v-else-if="route.fullPath === '/register-admin'" />
  <Authentication v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import Authentication from '@/components/Authentication.vue'
import AuthAdminView from '@/views/AuthAdminView.vue'

const route = useRoute()

const userStore = useUserStore()
const isAuthenticated = computed(() => userStore.user.id !== 0)
</script>

<style lang="scss" scoped></style>
