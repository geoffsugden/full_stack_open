import { create } from 'zustand'

const useMessageStore = create((set) => ({
  message: { msg: null, msgType: null },
  displayMessage: (newMessage) => {
    set({ message: newMessage })
    setTimeout(() => set({ message: { msg: null, msgType: null } }), 7_000)
  },
}))

export const useMessage = () => useMessageStore()
