<template>
  <div>
    <div v-if="isAuthenticated">
      <slot />
    </div>
    <Authentication v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import Authentication from '@/components/Authentication.vue'

const userStore = useUserStore()
const isAuthenticated = computed(() => userStore.user.id !== 0)
</script>

<style scoped></style>
