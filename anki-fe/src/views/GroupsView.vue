<template>
  <div class="groupsContainer">
    <GroupCard v-for="group in groups" :key="group._id" :group="group" />
    <PrimaryButton @click="handleAddNewGroup">Add new group</PrimaryButton>
  </div>
</template>

<script setup lang="ts">
import { requestWithTokenValidation } from '@/helpers/requestWithTokenValidation'
import { onMounted, ref } from 'vue'
import { useGroupsStore } from '@/stores/groups'
import { Group } from '@/helpers/types'
import GroupCard from '@/components/GroupCard.vue'
import PrimaryButton from '@/ui/PrimaryButton.vue'

const groups = ref<Group[]>([])
const groupName = ref('')

onMounted(() => {
  fetchGroups()
})

const handleAddNewGroup = async () => {
  groupName.value = prompt('Enter group name') || ''
  if (groupName.value) {
    await addNewGroup()
    await fetchGroups()
  }
}

const addNewGroup = async () => {
  try {
    const response = await requestWithTokenValidation({
      method: 'post',
      url: '/groups',
      data: {
        groupName: groupName.value
      }
    })

    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

const fetchGroups = async () => {
  const groupsStore = useGroupsStore()

  try {
    const response = await requestWithTokenValidation<Group[]>({
      method: 'get',
      url: '/groups'
    })

    groups.value = response.data
    groupsStore.setGroups(response.data)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped>
.groupsContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 15%;
}
</style>
