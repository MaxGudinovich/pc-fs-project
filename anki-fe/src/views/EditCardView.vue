<template>
  <div class="editContainer">
    <form @submit.prevent="handleSubmit" class="editContainer--form">
      <PrimaryInput
        class="editContainer--form-input"
        type="text"
        placeholder="word"
        v-model:modelValue="word"
      />
      <PrimaryInput
        class="editContainer--form-input"
        type="text"
        placeholder="translate"
        v-model:modelValue="translate"
      />
      <PrimaryInput
        class="editContainer--form-input"
        type="text"
        placeholder="description"
        v-model:modelValue="description"
      />
      <PrimaryButton type="submit">Submit</PrimaryButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { requestWithTokenValidation } from '@/helpers/requestWithTokenValidation'
import { useRoute, useRouter } from 'vue-router'
import { Card } from '@/helpers/types'
import { useCurrentGroupStore } from '@/stores/groups'
import PrimaryInput from '@/ui/PrimaryInput.vue'
import PrimaryButton from '@/ui/PrimaryButton.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const currentGroup = useCurrentGroupStore()

const word = ref('')
const translate = ref('')
const description = ref('')

onMounted(() => {
  fetchCard()
})

const fetchCard = async () => {
  try {
    const response = await requestWithTokenValidation<Card>({
      method: 'get',
      url: `/cards/${id}`
    })

    word.value = response.data.word
    translate.value = response.data.translate
    description.value = response.data.description
  } catch (error) {
    console.error(error)
  }
}

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

  if (currentGroup.group) {
    router.push(`/study/${currentGroup.group._id}`)
  }
}
</script>

<style lang="scss" scoped>
.editContainer {
  display: flex;
  flex-direction: column;
  align-items: center;

  &--form {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-input {
      margin: 10px;
    }
  }
}
</style>
