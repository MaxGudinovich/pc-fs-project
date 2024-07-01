<template>
  <div class="authAdminContainer">
    <SignUp :admin="true" />
  </div>
</template>

<script setup lang="ts">
import SignUp from '@/components/SignUp.vue'
</script>

<style lang="scss" scoped>
.authAdminContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 150px;
  width: 370px;
  height: 400px;
  padding: 20px;
  border: 1px solid var(--gray-500);
  border-radius: 8px;
}
</style>
