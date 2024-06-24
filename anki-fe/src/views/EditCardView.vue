<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="word" v-model="word" />
      <input type="text" placeholder="translate" v-model="translate" />
      <input type="text" placeholder="description" v-model="description" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { requestWithTokenValidation } from '@/helpers/requestWithTokenValidation'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const word = ref('')
const translate = ref('')
const description = ref('')

const handleSubmit = async () => {
  try {
    const response = await requestWithTokenValidation({
      method: 'patch',
      url: `/cards/${id}`,
      data: {
        word: word.value,
        translate: translate.value,
        description: description.value
      }
    })

    console.log(response)
  } catch (error) {
    console.error(error)
  }

  word.value = ''
  translate.value = ''
  description.value = ''
}
</script>

<style scoped></style>
