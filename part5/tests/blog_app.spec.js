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
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByLabel('username:')).toBeVisible()
    await expect(page.getByLabel('password:')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login tests', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'otg57', 'test')

      await expect(page.getByText('Oscar the Grouch logged in')).toBeVisible()

    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'otg57', 'wrong')

      await expect(page.getByText('Oscar the Grouch logged in')).not.toBeVisible()
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

      await expect(page.getByText(`Title: ${title}`)).toBeVisible()
    })

    describe('When only one blog exists', () => {
      beforeEach(async({ page }) => {
        const title = 'All about blogs'
        const author = 'Blogger McBlogger'
        const url = 'http://www.alltheblogs.com'

        await createBlog(page, title, author, url)
      })

      test('a blog can be liked', async({ page }) => {
        await expect(page.getByText('Title: All about blogs')).toBeVisible()
        await page.getByRole('button', { name: 'View' }).click()
        await expect(page.getByText('Likes: 0')).toBeVisible()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('Likes: 1')).toBeVisible()
      })

      test('blog can be deleted by user who created it', async({ page }) => {
        await expect(page.getByText('Title: All about blogs')).toBeVisible()
        await page.getByRole('button', { name: 'View' }).click()
        page.on('dialog', async dialog => {
          await expect(dialog.message()).toContain('Remove blog All about blogs by Blogger McBlogger')
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'Delete' }).click()
        await expect(page.getByText('Title: All about blogs')).not.toBeVisible()
      })

      test('blog cannot be deleted by user who didn\'t  created it', async({ page }) => {
        await page.getByRole('button', { name: 'Logout' }).click()
        await loginWith(page, 'bbb66', 'test')
        await expect(page.getByText('Title: All about blogs')).toBeVisible()
        await page.getByRole('button', { name: 'View' }).click()
        await expect(page.getByRole('button', { name: 'Delete' })).toHaveCount(0)
        await expect(page.getByText('Title: All about blogs')).toBeVisible()
      })

    })

    describe('Multiple Blogs exist', () => {
      beforeEach(async({ page }) => {
        await createBlog(page, 'fourth', 'zero likes', 'http://nolikes.com')
        await createBlog(page, 'third', '2 likes', 'http://2likes.com')
        await increaseLikes(page, 'Title: third', 2)
        await createBlog(page, 'second', '5 likes', 'http://5likes.com')
        await increaseLikes(page, 'Title: second', 5)
        await createBlog(page, 'first', '6 likes', 'http://6likes.com')
        await increaseLikes(page, 'Title: first', 6)
      })

      test.setTimeout(20_000)
      test('blogs are correctly order from most likes to least likes', async({ page }) => {
        const titles = await page.getByText('Title: ')
        await expect(titles.nth(1)).toHaveText('Title: first')
        await expect(titles.nth(2)).toHaveText('Title: second')
        await expect(titles.nth(3)).toHaveText('Title: third')
        await expect(titles.nth(4)).toHaveText('Title: fourth')
      })
    })
  })
})