const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'Login' }).click()
  await page.getByLabel('username:').fill(username)
  await page.getByLabel('password:').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async(page, title, author, url) => {
  await page.getByRole('button', { name: 'Create New Blog' }).click()
  await page.getByLabel('title:').fill(title)
  await page.getByLabel('author:').fill(author)
  await page.getByLabel('url:').fill(url)
  await page.getByRole('button', { name: 'Add Blog' }).click()

  await page.getByText(`Title: ${title}`).waitFor()
}

const increaseLikes = async(page, title, numLikes) => {
  await page.getByText(title).locator('..').getByRole('button', { name: 'View' }).click()
  const blogContainer = await page.getByText(title).locator('..')
  const likesButton = await blogContainer.getByRole('button', { name: 'Like' })
  for(let i = 0; i < numLikes; i++) {
    await likesButton.click()
    await page.waitForTimeout(500)
  }
}

export { loginWith, createBlog, increaseLikes }