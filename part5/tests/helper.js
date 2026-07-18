const loginWith = async (page, username, password) => {
  await page.getByRole('link', { name: 'Login' }).click()
  await page.getByLabel('username:').fill(username)
  await page.getByLabel('password:').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async(page, title, author, url) => {
  await page.getByRole('link', { name: 'New Blog' }).click()
  await page.getByLabel('title:').fill(title)
  await page.getByLabel('author:').fill(author)
  await page.getByLabel('url:').fill(url)
  await page.getByRole('button', { name: 'Add Blog' }).click()

  await page.getByText(`${title} by ${author}`).waitFor()
}

const increaseLikes = async(page, title, author, numLikes) => {
  await page.getByRole('link', { name: `${title} by ${author}` }).click()
  const likesButton = await page.getByRole('button', { name: 'Like' })
  for(let i = 0; i < numLikes; i++) {
    await likesButton.click()
    await page.waitForTimeout(200)
  }
}

export { loginWith, createBlog, increaseLikes }