<template>
  <div class="studyCard">
    <div class="studyCard--words">
      <div class="studyCard--words-item">{{ card.word }}</div>
      <div class="studyCard--words-item" v-if="isShowingTranslate">{{ card.translate }}</div>
    </div>
    <div class="studyCard--buttons">
      <PrimaryButton @click="handleShowAnswer">Show answer</PrimaryButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import PrimaryButton from '@/ui/PrimaryButton.vue'
import { Card } from '@/helpers/types'

const isShowingTranslate = ref(false)
const props = defineProps<{
  card: Card
}>()

const handleShowAnswer = () => {
  isShowingTranslate.value = !isShowingTranslate.value
}
</script>

<style lang="scss" scoped>
.studyCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  height: 300px;
  box-shadow: 0 0 2px black;
  cursor: pointer;

  &--words {
    display: flex;

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px;
      width: 150px;
      height: 150px;
      border: 1px solid var(--gray-300);
      font-size: 28px;
      color: var(--gray-700);
    }

    &:hover {
      background-color: var(--gray-200);
    }
  }

  &--buttons {
    margin-top: 20px;
  }
}
</style>
