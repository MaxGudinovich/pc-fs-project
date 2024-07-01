<template>
  <div class="registration">
    <h3 class="registration--title">registration</h3>
    <form class="form" @submit.prevent="handleRegister">
      <PrimaryInput type="text" placeholder="username" v-model:modelValue="username" />
      <PrimaryInput type="password" placeholder="password" v-model:modelValue="password" />
      <PrimaryInput
        v-if="admin === true"
        type="text"
        placeholder="secret key"
        v-model:modelValue="secretKey"
      />
      <PrimaryButton class="form--btn" type="submit">Register</PrimaryButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
import PrimaryInput from '@/ui/PrimaryInput.vue'
import PrimaryButton from '@/ui/PrimaryButton.vue'

const username = ref('')
const password = ref('')
const secretKey = ref('')
const router = useRouter()

const props = defineProps({
  admin: Boolean
})

console.log('Props:', props)

function handleRegister() {
  const userStore = useUserStore()
  console.log('Starting handleRegister with admin:', props.admin)

  if (props.admin) {
    console.log('Registering admin...')
    axios
      .post('http://localhost:3000/register-admin', {
        username: username.value,
        password: password.value,
        secretKey: secretKey.value
      })
      .then((response) => {
        console.log('Admin registration response:', response)

        const token = response.data.token
        const refreshToken = response.data.refreshToken

        const decodedToken: any = jwtDecode(token)
        console.log('Decoded token:', decodedToken)
        const { id, username, role } = decodedToken
        userStore.setUser({ id, username, role })
        localStorage.setItem('access', token)
        localStorage.setItem('refresh', refreshToken)
        router.push('/')
      })
      .catch((error) => {
        console.error('Admin registration error:', error)
      })
  } else {
    console.log('Registering user...')
    axios
      .post('http://localhost:3000/register', {
        username: username.value,
        password: password.value
      })
      .then((response) => {
        console.log('User registration response:', response)

        const token = response.data.token
        const refreshToken = response.data.refreshToken

        const decodedToken: any = jwtDecode(token)
        console.log('Decoded token:', decodedToken)
        const { id, username, role } = decodedToken
        userStore.setUser({ id, username, role })
        localStorage.setItem('access', token)
        localStorage.setItem('refresh', refreshToken)
      })
      .catch((error) => {
        console.error('User registration error:', error)
      })
  }
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
.registration {
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
