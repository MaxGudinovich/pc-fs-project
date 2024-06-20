import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: number
  username: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref({ id: 0, username: '' } as User)
  const setUser = (newUser: User) => {
    user.value = newUser
  }
  return { user, setUser }
})
