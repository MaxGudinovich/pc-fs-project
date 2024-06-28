<template>
  <div class="groupCard" @click="handleClick">
    <div class="groupCard--title">{{ group.groupName }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { Group } from '@/helpers/types'

const router = useRouter()

const props = defineProps<{ group: Group }>()
console.log(props.group)

const handleClick = () => {
  router.push(`/study/${props.group._id}`)
}
</script>

<style scoped lang="scss">
.groupCard {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  cursor: pointer;
  padding: 20px;
  margin: 15px;
  width: 100%;
  height: 60px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 2px black;

  &--title {
    font-size: 28px;
    color: var(--gray-700);
  }

  &:hover {
    background-color: var(--gray-200);
  }
}
</style>
