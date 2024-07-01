<template>
  <div class="login">
    <h3 class="login--title">login</h3>
    <form class="form" @submit.prevent="handleLogin">
      <PrimaryInput type="text" placeholder="username" v-model:modelValue="usernameLogin" />
      <PrimaryInput type="password" placeholder="password" v-model:modelValue="passwordLogin" />
      <PrimaryButton class="form--btn" type="submit">Login</PrimaryButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useUserStore } from '@/stores/user'
import PrimaryInput from '@/ui/PrimaryInput.vue'
import PrimaryButton from '@/ui/PrimaryButton.vue'

const usernameLogin = ref('')
const passwordLogin = ref('')

function handleLogin() {
  const userStore = useUserStore()

  axios
    .post('http://localhost:3000/login', {
      username: usernameLogin.value,
      password: passwordLogin.value
    })
    .then((response) => {
      console.log(response)

      const token = response.data.token
      const refreshToken = response.data.refreshToken

      const decodedToken: any = jwtDecode(token)
      console.log(decodedToken)
      const { id, username, role } = decodedToken
      userStore.setUser({ id, username, role })
      localStorage.setItem('access', token)
      localStorage.setItem('refresh', refreshToken)
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding: 20px;
  gap: 10px;

  &--btn {
    margin-top: 20px;
  }
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;

  &--title {
    font-size: 24px;
    color: var(--gray-600);
  }
}
</style>
