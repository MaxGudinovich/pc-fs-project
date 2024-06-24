<template>
  <div class="groupContainer">
    <form @submit.prevent="handleSubmit" class="groupContainer--form">
      <input type="text" placeholder="word" v-model="word" />
      <input type="text" placeholder="translate" v-model="translate" />
      <input type="text" placeholder="description" v-model="description" />
      <select v-model="selectedGroup">
        <option v-for="group in groups" :key="group._id" :value="group.groupName">
          {{ group.groupName }}
        </option>
      </select>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { requestWithTokenValidation } from '@/helpers/requestWithTokenValidation'
import { useGroupsStore } from '@/stores/groups'
import { Group } from '@/helpers/types'

const word = ref('')
const translate = ref('')
const groups = ref<Group[]>([])
const description = ref('')
const selectedGroup = ref<string>('')
const route = useRoute()

const groupId = route.query.groupId || ''

onMounted(() => {
  fetchGroups()
})

const handleSubmit = async () => {
  try {
    const response = await requestWithTokenValidation({
      method: 'post',
      url: '/cards',
      data: {
        word: word.value,
        translate: translate.value,
        groupName: selectedGroup.value,
        description: description.value
      }
    })

    console.log(response)
  } catch (error) {
    console.error(error)
  }

  word.value = ''
  translate.value = ''
  description.value = ''
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

watch(groups, (newGroups) => {
  if (newGroups.length > 0) {
    const defaultGroup = newGroups.find((group) => group._id === groupId)
    if (defaultGroup) {
      selectedGroup.value = defaultGroup.groupName
    } else {
      selectedGroup.value = newGroups[0].groupName
    }
  }
})
</script>

<style lang="scss" scoped>
.groupContainer {
  display: flex;
  flex-direction: column;
  align-items: center;

  &--form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
