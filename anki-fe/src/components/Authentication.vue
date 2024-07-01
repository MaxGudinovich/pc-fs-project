<template>
  <div class="authContainer">
    <SingUp v-if="isSignUp" />
    <SignIn v-if="!isSignUp" />
    <PrimaryButton class="authContainer--btn" @click="isSignUp = !isSignUp">
      {{ isSignUp ? 'to Login' : 'to Registration' }}
    </PrimaryButton>
  </div>
</template>

<script setup lang="ts">
import SignIn from '@/components/SignIn.vue'
import SingUp from '@/components/SignUp.vue'
import { ref } from 'vue'
import PrimaryButton from '@/ui/PrimaryButton.vue'

const isSignUp = ref(false)
</script>

<style lang="scss" scoped>
.authContainer {
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

  &--btn {
    margin-top: 50px;
  }
}
</style>
