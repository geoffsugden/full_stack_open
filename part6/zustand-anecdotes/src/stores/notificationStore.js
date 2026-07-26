import { create } from 'zustand'

const useNotificationStore = create((set,get) => ({
  notification: '',
  timeoutId: null,
  actions: {
    setNotification: async (message) => {
      const curTimeoutId = get().timeoutId
      if(curTimeoutId) { 
        clearTimeout(curTimeoutId)
      }
      const newTimeoutId = setTimeout(() => {
        set({ notification: '', timeoutId: null })
      }, 5000)

      set({ notification: message, timeoutId: newTimeoutId })
    }
  }
}))
export const useNotification = () => useNotificationStore(state => state.notification)
export const useNotificationActions = () => useNotificationStore(state => state.actions)
