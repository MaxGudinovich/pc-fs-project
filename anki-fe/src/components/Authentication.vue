<template>
  <div class="auth-container">
    <SingUp v-if="isSignUp" />
    <SignIn v-if="!isSignUp" />
    <button @click="isSignUp = !isSignUp">
      {{ isSignUp ? 'to Login' : 'to Registration' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import SignIn from '@/components/SignIn.vue'
import SingUp from '@/components/SignUp.vue'
import { ref } from 'vue'

const isSignUp = ref(false)
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>
