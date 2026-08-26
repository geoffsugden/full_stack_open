const localStoreKey = 'loggedBlogListUser'

export const getUser = () => {
  return window.localStorage.getItem(localStoreKey)
}

export const saveUser = (user) => {
  window.localStorage.setItem(localStoreKey, JSON.stringify(user))
}

export const removeUser = () => {
  window.localStorage.removeItem(localStoreKey)
}
