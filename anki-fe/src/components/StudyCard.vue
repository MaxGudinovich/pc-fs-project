<template>
  <div class="StudyCard">
    <div class="StudyCard__word">{{ card.word }}</div>
    <div class="StudyCard__translate">{{ card.translate }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Card } from '@/helpers/types'

const props = defineProps<{
  card: Card
}>()
</script>

<style scoped></style>
