<template>
  <div class="groupContainer">
    <form @submit.prevent="handleSubmit" class="groupContainer--form">
      <PrimaryInput
        class="groupContainer--form-input"
        type="text"
        placeholder="word"
        v-model:modelValue="word"
      />
      <PrimaryInput
        class="groupContainer--form-input"
        type="text"
        placeholder="translate"
        v-model:modelValue="translate"
      />
      <PrimaryInput
        class="groupContainer--form-input"
        type="text"
        placeholder="description"
        v-model:modelValue="description"
      />
      <select v-model="selectedGroup" class="groupContainer--form-select">
        <option v-for="group in groups" :key="group._id" :value="group.groupName">
          {{ group.groupName }}
        </option>
      </select>
      <PrimaryButton type="submit">Submit</PrimaryButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { requestWithTokenValidation } from '@/helpers/requestWithTokenValidation'
import { useGroupsStore } from '@/stores/groups'
import { useUserStore } from '@/stores/user'
import { Group } from '@/helpers/types'
import PrimaryInput from '@/ui/PrimaryInput.vue'
import PrimaryButton from '@/ui/PrimaryButton.vue'

const userStore = useUserStore()
const isAdmin = userStore.user.role === 'admin'
const word = ref('')
const translate = ref('')
const groups = ref<Group[]>([])
const description = ref('')
const selectedGroup = ref<string>('')
const route = useRoute()

const groupId = route.query.groupId || ''

onMounted(() => {
  if (isAdmin) {
    fetchAllGroups()
  } else {
    fetchGroups()
  }
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
        description: description.value,
        groupId: groups.value.find((group) => group.groupName === selectedGroup.value)?._id
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

    &-input {
      margin: 10px;
    }

    &-select {
      user-select: none;
      padding: 10px;
      border: 1px solid var(--gray-600);
      border-radius: 5px;
      width: 250px;
      background-color: var(--body-color);
      font-size: 18px;
      margin: 10px;
    }
  }
}
</style>
