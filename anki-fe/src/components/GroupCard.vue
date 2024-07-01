<template>
  <div class="groupCard" @click="handleClick">
    <div class="groupCard--title">{{ group.groupName }}</div>
    <PrimaryButton class="groupCard-btn" @click.stop="handleDeleteGroup(group._id)"
      >Delete</PrimaryButton
    >
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { Group } from '@/helpers/types'
import PrimaryButton from '@/ui/PrimaryButton.vue'

const router = useRouter()

const props = defineProps<{ group: Group; handleDeleteGroup: (groupId: string) => void }>()
console.log(props.group)

const handleClick = () => {
  router.push(`/study/${props.group._id}`)
}
</script>

<style scoped lang="scss">
.groupCard {
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
  border-bottom: 1px solid var(--gray-300);

  &--title {
    font-size: 28px;
    color: var(--gray-700);
  }

  &-btn {
    margin-left: auto;

    &:hover {
      background-color: var(--red-danger) !important;
    }
  }

  &:hover {
    background-color: var(--gray-200);
  }
}
</style>
