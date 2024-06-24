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
  justify-content: center;
  border: 1px solid #ddd;
  background-color: lightgray;
  cursor: pointer;
  padding: 20px;
  margin: 20px;
  width: 80%;
  height: 70px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 0 2px black;

  &--title {
    font-size: 40px;
    font-weight: bold;
    color: lightblue;
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
  }

  &:hover {
    background-color: slategrey;
  }
}
</style>
