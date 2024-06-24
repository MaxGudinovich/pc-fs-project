<template>
  <div>
    <Header />
    <main>
      <ProtectedRoute>
        <router-view />
      </ProtectedRoute>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import ProtectedRoute from '@/components/ProtectedRoute.vue'
</script>

<style scoped></style>
