<template>
  <div class="studyContainer">
    <template v-if="loading"></template>
    <template v-else>
      <StudyCard
        v-if="group && group.cards.length > 0"
        :card="group.cards[currentCardIndex]"
        :isShowingTranslate
        :handleShowAnswer
      />
      <div
        class="studyContainer--buttons"
        v-if="group && group.cards.length > 0"
        :card="group.cards[currentCardIndex]"
      >
        <PrimaryButton @click="editCard" v-if="group && group.cards.length > 0"
          >Edit card</PrimaryButton
        >
        <PrimaryButton @click="nextCard" v-if="group && group.cards.length > 0"
          >Next card</PrimaryButton
        >
        <PrimaryButton @click="navigateToAddCards">Add cards</PrimaryButton>
      </div>
      <div v-else class="studyContainer--empty">
        <p>There are no cards in this group</p>
        <PrimaryButton @click="navigateToAddCards">Add cards</PrimaryButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { requestWithTokenValidation } from '@/helpers/requestWithTokenValidation'
import { useCurrentGroupStore } from '@/stores/groups'
import { Group } from '@/helpers/types'
import StudyCard from '@/components/StudyCard.vue'
import PrimaryButton from '@/ui/PrimaryButton.vue'

const route = useRoute()
const router = useRouter()
const group = ref<Group | null>(null)
const id = route.params.id
const currentCardIndex = ref(0)
const isShowingTranslate = ref(false)
const currentGroup = useCurrentGroupStore()
const loading = ref(true)

const handleShowAnswer = () => {
  isShowingTranslate.value = !isShowingTranslate.value
}

onMounted(() => {
  const initialIndex = 0
  const savedIndex = sessionStorage.getItem('currentCardIndex')
  const savedIndexAfterEdit = sessionStorage.getItem('currentCardIndexAfterEdit')

  if (savedIndexAfterEdit !== null) {
    currentCardIndex.value = parseInt(savedIndexAfterEdit, 10)
  }

  if (savedIndex !== null) {
    currentCardIndex.value = parseInt(savedIndex, 10)
  }

  if (savedIndex === null) {
    sessionStorage.setItem('currentCardIndex', initialIndex.toString())
    sessionStorage.setItem('currentCardIndexAfterEdit', initialIndex.toString())
  }

  fetchGroup()
})

onBeforeUnmount(() => {
  sessionStorage.removeItem('currentCardIndex')
})

const fetchGroup = async () => {
  try {
    const response = await requestWithTokenValidation<Group>({
      method: 'get',
      url: `/groups/${id}`
    })

    group.value = response.data
    currentGroup.setGroup(group.value)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
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
    sessionStorage.setItem('currentCardIndexAfterEdit', currentCardIndex.value.toString())
  }
  isShowingTranslate.value = false
}

const editCard = () => {
  const cardId = group.value?.cards[currentCardIndex.value]._id

  if (cardId) {
    router.push(`/edit/${cardId}`)
  }
}

const navigateToAddCards = () => {
  router.push({ path: '/add', query: { groupId: id } })
}
</script>

<style lang="scss" scoped>
.studyContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 15%;

  &--buttons {
    display: flex;
    gap: 20px;
    margin-top: 150px;
  }

  &--empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 18px;
  }
}
</style>
