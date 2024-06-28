<template>
  <div class="login">
    <h3>login</h3>
    <form class="form" @submit.prevent="handleLogin">
      <input type="text" placeholder="username" v-model="usernameLogin" />
      <input type="password" placeholder="password" v-model="passwordLogin" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useUserStore } from '@/stores/user'

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

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 20px;
  gap: 10px;
}
.login {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  background-color: #f0f0f0;
}
</style>
