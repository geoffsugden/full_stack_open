import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('title and author show by default and that url and likes are hidden by default.', async() => {
  // Note - Exercise 5.13 have assumed based on previuos exerecises and course discord that 'renders'
  // in this case is referring to what is shown to the user (i.e. hidden by css === not rendered)
  // It could also be taken to mean not written to the DOM, this case has NOT been implemented or tested
  const blog = {
    title: 'Tales from Toddlerhood',
    author: 'Tim Urban',
    url: 'https://waitbutwhy.com/2025/10/toddler.html',
    likes: 6,
    user: {
      name: 'Geoff'
    }
  }

  render(<Blog blog={blog} />)

  const elT = screen.getByText('Title: Tales from Toddlerhood')
  expect(elT).toBeDefined()
  expect(elT).toBeVisible()
  const elA = screen.getByText('Author: Tim Urban')
  expect(elA).toBeDefined()
  expect(elA).toBeVisible()

  const elU = screen.getByText('https://waitbutwhy.com/2025/10/toddler.html')
  expect(elU).toBeDefined()
  expect(elU).not.toBeVisible()
  const elL = screen.getByText('Likes: 6')
  expect(elL).toBeDefined()
  expect(elL).not.toBeVisible()
})

test('url and likes are shown when the "View" button is clicked', async() => {
  const blog = {
    title: 'Tales from Toddlerhood',
    author: 'Tim Urban',
    url: 'https://waitbutwhy.com/2025/10/toddler.html',
    likes: 6,
    user: {
      name: 'Geoff'
    }
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')

  const elU = screen.getByText('https://waitbutwhy.com/2025/10/toddler.html')
  const elL = screen.getByText('Likes: 6')
  expect(elU).toBeDefined()
  expect(elU).not.toBeVisible()

  expect(elL).toBeDefined()
  expect(elL).not.toBeVisible()

  await user.click(viewButton)

  expect(elU).toBeDefined()
  expect(elU).toBeVisible()

  expect(elL).toBeDefined()
  expect(elL).toBeVisible()

})

test('event handler (update likes) is called equal to number of clicks', async() => {
  const blog = {
    title: 'Tales from Toddlerhood',
    author: 'Tim Urban',
    url: 'https://waitbutwhy.com/2025/10/toddler.html',
    likes: 6,
    user: {
      name: 'Geoff'
    }
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} updateLikes={mockHandler}/>)

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const likesButton = screen.getByText('Like')
  await user.click(likesButton)

  expect(mockHandler.mock.calls).toHaveLength(1)

  await user.click(likesButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})