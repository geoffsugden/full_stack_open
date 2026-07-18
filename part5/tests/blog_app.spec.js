const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog, increaseLikes } = require('./helper')

describe('Bloglist App', () => {
  beforeEach(async({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Oscar the Grouch',
        username: 'otg57',
        password: 'test'
      }
    })
    await request.post('/api/users', {
      data: {
        'username': 'bbb66',
        'name': 'Big Bird',
        'password': 'test'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click()
    await expect(page.getByLabel('username:')).toBeVisible()
    await expect(page.getByLabel('password:')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login tests', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'otg57', 'test')

      await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()

    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'otg57', 'wrong')

      await expect(page.getByRole('button', { name: 'Logout' })).not.toBeVisible()
      await expect(page.getByText('Login failed due to invalid username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async({ page }) => {
      await loginWith(page, 'otg57', 'test')
    })
    test('a new blog can be created', async ({ page }) => {
      const title = 'All about blogs'
      const author = 'Blogger McBlogger'
      const url = 'http://www.alltheblogs.com'

      await createBlog(page, title, author, url)

      await expect(page.getByText(`${title} by ${author}`)).toBeVisible()
    })

    describe('When only one blog exists', () => {
      const title = 'All about blogs'
      const author = 'Blogger McBlogger'
      const url = 'http://www.alltheblogs.com'

      beforeEach(async({ page }) => {
        await createBlog(page, title, author, url)
      })

      test('a blog can be liked', async({ page }) => {
        await page.getByRole('link', { name: `${title} by ${author}` }).click()
        await expect(page.getByText('Likes: 0')).toBeVisible()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('Likes: 1')).toBeVisible()
      })

      test('blog can be deleted by user who created it', async({ page }) => {
        await page.getByRole('link', { name: `${title} by ${author}` }).click()
        page.on('dialog', async dialog => {
          await expect(dialog.message()).toContain('Remove blog All about blogs by Blogger McBlogger')
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'Delete' }).click()
        await page.goto('/')
        await expect(page.getByRole('link', { name: `${title} by ${author}` })).not.toBeVisible()
        await page.getByText('Blogs')
      })

      test('blog cannot be deleted by user who didn\'t  created it', async({ page }) => {
        await page.getByRole('button', { name: 'Logout' }).click()
        await loginWith(page, 'bbb66', 'test')
        await page.getByRole('link', { name: `${title} by ${author}` }).click()
        await expect(page.getByRole('button', { name: 'Delete' })).toHaveCount(0)
        await page.goto('/')
        await expect(page.getByText(`${title} by ${author}`)).toBeVisible()
      })

    })

    describe('Multiple Blogs exist', () => {
      beforeEach(async({ page }) => {
        await createBlog(page, 'fourth', 'zero likes', 'http://nolikes.com')
        await createBlog(page, 'third', '2 likes', 'http://2likes.com')
        await increaseLikes(page, 'third', '2 likes', 2)
        await createBlog(page, 'second', '5 likes', 'http://5likes.com')
        await increaseLikes(page, 'second', '5 likes', 5)
        await createBlog(page, 'first', '6 likes', 'http://6likes.com')
        await increaseLikes(page, 'first', '6 likes', 6)
      })

      test.setTimeout(20_000)
      test('blogs are correctly order from most likes to least likes', async({ page }) => {
        await page.goto('/')
        const titles = await page.getByRole('link')
        await expect(titles.nth(2)).toHaveText('first by 6 likes')
        await expect(titles.nth(3)).toHaveText('second by 5 likes')
        await expect(titles.nth(4)).toHaveText('third by 2 likes')
        await expect(titles.nth(5)).toHaveText('fourth by zero likes')
      })
    })
  })
})