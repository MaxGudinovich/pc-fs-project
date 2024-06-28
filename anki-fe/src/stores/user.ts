import { defineStore } from 'pinia'
import { ref } from 'vue'
import { User } from '@/helpers/types'

export const useUserStore = defineStore('user', () => {
  const user = ref({ id: 0, username: '', role: '' } as User)
  const setUser = (newUser: User) => {
    user.value = newUser
  }
  return { user, setUser }
})
