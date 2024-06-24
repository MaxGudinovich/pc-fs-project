<template>
  <div class="wordContainer">
    <StudyCard v-if="group && group.cards.length > 0" :card="group.cards[currentCardIndex]" />
    <button @click="nextCard" v-if="group && group.cards.length > 0">Next card</button>
    <button @click="editCard" v-if="group && group.cards.length > 0">Edit card</button>
    <div v-else>
      <p>No cards in this group</p>
      <button @click="navigateToAddCards">Add cards</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { requestWithTokenValidation } from '@/helpers/requestWithTokenValidation'
import { Group } from '@/helpers/types'
import StudyCard from '@/components/StudyCard.vue'

const route = useRoute()
const router = useRouter()
const group = ref<Group | null>(null)
const id = route.params.id
const currentCardIndex = ref(0)

onMounted(() => {
  const savedIndex = sessionStorage.getItem('currentCardIndex')
  if (savedIndex !== null) {
    currentCardIndex.value = parseInt(savedIndex, 10)
  }

  fetchGroup()
})

onBeforeUnmount(() => {
  sessionStorage.clear()
})

const fetchGroup = async () => {
  try {
    const response = await requestWithTokenValidation<Group>({
      method: 'get',
      url: `/groups/${id}`
    })

    group.value = response.data
  } catch (error) {
    console.error(error)
  }
}

const nextCard = () => {
  if (group.value) {
    if (currentCardIndex.value < group.value.cards.length - 1) {
      currentCardIndex.value++
    } else {
      currentCardIndex.value = 0
    }
    sessionStorage.setItem('currentCardIndex', currentCardIndex.value.toString())
  }
}

const editCard = () => {
  const cardId = group.value?.cards[currentCardIndex.value]._id

  if (cardId) {
    router.push(`/edit/${cardId}`)
  }
}

const navigateToAddCards = () => {
  router.push({ path: '/about', query: { groupId: id } })
}
</script>

<style scoped></style>
