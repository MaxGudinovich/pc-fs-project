<template>
  <input
    class="primaryInput"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  type: string
  placeholder: string
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style lang="scss" scoped>
.primaryInput {
  user-select: none;
  padding: 10px;
  border: 1px solid var(--gray-600);
  border-radius: 5px;
  width: 250px;
  background-color: var(--body-color);
  font-size: 18px;
}
</style>
