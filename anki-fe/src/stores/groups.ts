import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Group } from '@/helpers/types'

export const useGroupsStore = defineStore('groups', () => {
  const groups = ref([] as Group[])
  const setGroups = (newGroups: Group[]) => {
    groups.value = newGroups
  }
  return { groups, setGroups }
})
