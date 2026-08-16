import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import NewBlogForm from './CreateBlog'
import { expect } from 'vitest'

test('event handler called with expected information', async () => {
  const mockHandler = vi.fn()

  render(
    <MemoryRouter>
      <NewBlogForm addNewBlog={mockHandler} />
    </MemoryRouter>
  )

  const user = userEvent.setup()

  const titleInput = screen.getByLabelText('title:')
  const authorInput = screen.getByLabelText('author:')
  const urlInput = screen.getByLabelText('url:')

  expect(titleInput).toBeDefined()
  expect(authorInput).toBeDefined()
  expect(urlInput).toBeDefined()

  const title = 'Bloggest Blog'
  const author = 'Bloggy McBlogface'
  const url = 'http://bloggy.com'

  await user.click(titleInput)
  await user.keyboard(title)
  await user.click(authorInput)
  await user.keyboard(author)
  await user.click(urlInput)
  await user.keyboard(url)

  expect(titleInput).toHaveValue(title)
  expect(authorInput).toHaveValue(author)
  expect(urlInput).toHaveValue(url)

  const createBlogButton = screen.getByText('Add Blog')
  expect(createBlogButton).toBeDefined()

  await user.click(createBlogButton)
  const newBlog = mockHandler.mock.calls[0][0]
  expect(newBlog).toStrictEqual({ title: title, author: author, url: url })
})
