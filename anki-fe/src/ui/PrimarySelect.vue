<template>
  <select v-model="selectedValue" @change="handleChange">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps<{
  options: { value: string; label: string }[]
  modelValue: string
}>()

console.log(props)

const emit = defineEmits(['update:modelValue'])

const selectedValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    selectedValue.value = newVal
  }
)

const handleChange = (event: Event) => {
  const selectedOption = event.target as HTMLSelectElement
  emit('update:modelValue', selectedOption.value)
}
</script>

<style scoped>
select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
