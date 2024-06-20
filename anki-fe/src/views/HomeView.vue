<template>
  <div class="main-container">
    <div class="registration">
      <h3>registration</h3>
      <form class="form" @submit.prevent="handleRegister">
        <input type="text" placeholder="username" v-model="username" />
        <input type="password" placeholder="password" v-model="password" />
        <button type="submit">Register</button>
      </form>
    </div>
    <div class="login">
      <h3>login</h3>
      <form class="form" @submit.prevent="handleLogin">
        <input type="text" placeholder="username" v-model="usernameLogin" />
        <input type="password" placeholder="password" v-model="passwordLogin" />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
  <button @click="fetchGroups">GET GROUPS</button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useUserStore } from '@/stores/user'
import { requestWithTokenValidation } from '@/helpers/requestWithTokenValidation'

const username = ref('')
const password = ref('')
const usernameLogin = ref('')
const passwordLogin = ref('')

function handleRegister() {
  console.log('Submitting with username:', username.value, 'and password:', password.value)
  axios
    .post('http://localhost:3000/register', {
      username: username.value,
      password: password.value
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
}

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
      const { id, username } = decodedToken
      userStore.setUser({ id, username })
      localStorage.setItem('access', token)
      localStorage.setItem('refresh', refreshToken)
    })
    .catch((error) => {
      console.error(error)
    })
}

const fetchGroups = async () => {
  try {
    const response = await requestWithTokenValidation({
      method: 'get',
      url: '/groups'
    })

    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

/* fetchGroups() */
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.registration {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  background-color: #f0f0f0;
}
.login {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  background-color: #f0f0f0;
}
.form {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 20px;
  gap: 10px;
}
</style>
