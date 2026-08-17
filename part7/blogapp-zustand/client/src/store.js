import { create } from 'zustand'
import blogService from './services/blogs'


const useMessageStore = create((set) => ({
  message: { msg: null, msgType: null }, 
  displayMessage: (newMessage) => {
    set({ message : newMessage })
    setTimeout(() => set({ message: { msg: null, msgType: null }}), 7_000)
  }
})) 

export const useMessage = () => useMessageStore()

const useBlogsStore = create((set, get) => ({
  blogs: [],
  actions: {
    addBlog: async (blog) => {
      const newBlog = await blogService.createBlogListing(blog)
      if(newBlog) {
        set((state) => ({ blogs: [...state.blogs, newBlog].sort((a,b) => b.likes - a.likes) }))    
        return newBlog
      }
    },
    initialize: async () => {
      const blogs = await blogService.getAll()
      set({ blogs: blogs.toSorted((a,b) => b.likes - a.likes) })
    },
    updateBlogLikes: async (blog) => {
      const updatedBlog = await blogService.updateBlogListing({ id: blog.id, likes: blog.likes + 1 })
      set((state) => ({ blogs: state.blogs.map(b => b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b ).sort((a,b) => b.likes - a.likes)}))
    },
    removeBlog: async (blogId) => {
      await blogService.removeBlog(blogId)
      set((state) => ({ blogs: state.blogs.filter(b => b.id !== blogId).sort((a,b) => b.likes - a.likes)}))
    },
    retrieveBlog: (blogId) => {
      const blogs =  get().blogs
      return blogs.find(blog => blog.id === blogId)
    }
  } 

}))

export const useBlogs = () => useBlogsStore(state => state.blogs)
export const useBlogActions = () => useBlogsStore(state => state.actions)