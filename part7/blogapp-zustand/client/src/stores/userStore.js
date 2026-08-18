import { create } from 'zustand'
import blogService from '../services/blogs'
import login from '../services/login'

const useUserStore = create((set) => ({
  user: null,
  actions: {
    initialize: () => {
      const loggedInUserJSON = window.localStorage.getItem('loggedBlogListUser')
      if (loggedInUserJSON) {
        const user = JSON.parse(loggedInUserJSON)
        blogService.setToken(user.token)
        set({ user: user })
      }
    },
    login: async ({ username, password }) => {
      const user = await login({ username, password })
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
      blogService.setToken(user.token)
      set({ user: user })
      return user
    },
    logout: () => {
      localStorage.removeItem('loggedBlogListUser')
      set({ user: null })
    },
  },
}))

export const useUser = () => useUserStore((state) => state.user)
export const useUserActions = () => useUserStore((state) => state.actions)
