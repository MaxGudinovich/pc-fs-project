<template>
  <div class="main-layout">
    <main class="main-content">
      <ProtectedRoute>
        <router-view />
      </ProtectedRoute>
    </main>
  </div>
</template>

<script setup lang="ts">
import ProtectedRoute from '@/components/ProtectedRoute.vue'
</script>

<style lang="scss" scoped>
.main-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
