<template>
  <div class="studyCard">
    <div class="studyCard--words">
      <div class="studyCard--words-item">
        <p class="studyCard--words-p">Word:</p>
        {{ card.word }}
      </div>
      <div class="studyCard--words-item" v-if="isShowingTranslate">
        <p class="studyCard--words-p">Translate:</p>
        {{ card.translate }}
      </div>
      <div class="studyCard--words-item studyCard--words-item-last" v-if="isShowingTranslate">
        <p class="studyCard--words-p">Description:</p>
        {{ card.description }}
      </div>
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

const props = defineProps<{
  card: Card
  isShowingTranslate: boolean
  handleShowAnswer: () => void
}>()
</script>

<style lang="scss" scoped>
.studyCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  height: 300px;
  cursor: pointer;
  border-bottom: 1px solid var(--gray-300);

  &--words {
    width: 100%;
    display: flex;
    align-self: flex-start;

    &-p {
      font-size: 20px;
      margin-bottom: 10px;
      color: var(--gray-500);
    }

    &-item {
      margin-right: 40px;
      padding: 10px 20px;
      min-width: 150px;
      height: 200px;
      max-width: 400px;
      font-size: 28px;
      color: var(--gray-700);
      overflow: scroll;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      white-space: normal;
      word-wrap: break-word;
      border-right: 1px solid var(--gray-300);

      &::-webkit-scrollbar {
        width: 0px;
      }

      &-last {
        margin-left: auto;
      }
    }
  }

  &--buttons {
    margin-top: 30px;
  }
}
</style>
