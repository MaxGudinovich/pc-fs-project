<template>
  <div class="groupsContainer">
    <template v-if="loading"></template>
    <template v-else>
      <GroupCard v-for="group in groups" :key="group._id" :group="group" :handleDeleteGroup />
      <PrimaryButton @click="handleAddNewGroup" class="groupsContainer--btn"
        >Add new group</PrimaryButton
      ></template
    >
  </div>
</template>

<script setup lang="ts">
import { requestWithTokenValidation } from '@/helpers/requestWithTokenValidation'
import { onMounted, ref } from 'vue'
import { useGroupsStore } from '@/stores/groups'
import { useUserStore } from '@/stores/user'
import { Group } from '@/helpers/types'
import GroupCard from '@/components/GroupCard.vue'
import PrimaryButton from '@/ui/PrimaryButton.vue'

const groups = ref<Group[]>([])
const groupName = ref('')
const loading = ref(true)
const userStore = useUserStore()
const isAdmin = userStore.user.role === 'admin'
console.log(groups.value)

onMounted(() => {
  if (isAdmin) {
    fetchAllGroups()
  } else {
    fetchGroups()
  }
})

const handleDeleteGroup = async (groupId: string) => {
  try {
    const response = await requestWithTokenValidation({
      method: 'delete',
      url: `/groups/${groupId}`
    })

    console.log(response)
    groups.value = groups.value.filter((group) => group._id !== groupId)
  } catch (error) {
    console.error(error)
  }
}

const handleAddNewGroup = async () => {
  groupName.value = prompt('Enter group name') || ''
  if (groupName.value) {
    await addNewGroup()
    if (isAdmin) {
      await fetchAllGroups()
    } else {
      await fetchGroups()
    }
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
  } finally {
    loading.value = false
  }
}

const fetchAllGroups = async () => {
  const groupsStore = useGroupsStore()

  try {
    const response = await requestWithTokenValidation<Group[]>({
      method: 'get',
      url: '/groups-all'
    })

    groups.value = response.data
    groupsStore.setGroups(response.data)
    console.log(response)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.groupsContainer {
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 15%;

  &--btn {
    margin-top: 20px;
  }
}
</style>
