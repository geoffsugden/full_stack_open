import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

test('title, author, url and likes are shown', async () => {
  // Note - Exercise 5.13 have assumed based on previous exerecises and course discord that 'renders'
  // in this case is referring to what is shown to the user (i.e. hidden by css === not rendered)
  // It could also be taken to mean not written to the DOM, this case has NOT been implemented or tested
  const blog = {
    title: 'Tales from Toddlerhood',
    author: 'Tim Urban',
    url: 'https://waitbutwhy.com/2025/10/toddler.html',
    likes: 6,
    user: { name: 'Geoff' },
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
  expect(elU).toBeVisible()
  const elL = screen.getByText('Likes: 6')
  expect(elL).toBeDefined()
  expect(elL).toBeVisible()

  expect(screen.queryByRole('button', { name: 'Like' })).toBeNull()
  expect(screen.queryByRole('button', { name: 'Delete' })).toBeNull()
})

test("Logged in user (who didn't create blog) can see Like Button", async () => {
  const blog = {
    title: 'Tales from Toddlerhood',
    author: 'Tim Urban',
    url: 'https://waitbutwhy.com/2025/10/toddler.html',
    likes: 6,
    user: { name: 'Not Geoff', user: 'notgds48' },
  }

  const loggedInUser = { username: 'gds48', name: 'Geoff Sugden' }

  render(<Blog blog={blog} loggedInUser={loggedInUser} />)

  const elT = screen.getByText('Title: Tales from Toddlerhood')
  expect(elT).toBeDefined()
  expect(elT).toBeVisible()
  const elA = screen.getByText('Author: Tim Urban')
  expect(elA).toBeDefined()
  expect(elA).toBeVisible()

  const elU = screen.getByText('https://waitbutwhy.com/2025/10/toddler.html')
  expect(elU).toBeDefined()
  expect(elU).toBeVisible()
  const elL = screen.getByText('Likes: 6')
  expect(elL).toBeDefined()
  expect(elL).toBeVisible()

  const likeButton = screen.getByRole('button', { name: 'Like' })
  expect(likeButton).toBeDefined()

  const deleteButton = screen.queryByRole('button', { name: 'Delete' })
  expect(deleteButton).toBeNull()
})

test('Logged in user (who did create blog) can see Like Button and Delete Button', async () => {
  const blog = {
    title: 'Tales from Toddlerhood',
    author: 'Tim Urban',
    url: 'https://waitbutwhy.com/2025/10/toddler.html',
    likes: 6,
    user: { name: 'Geoff Sugden', username: 'gds48' },
  }

  const loggedInUser = { username: 'gds48', name: 'Geoff Sugden' }

  render(<Blog blog={blog} loggedInUser={loggedInUser} />)

  const elT = screen.getByText('Title: Tales from Toddlerhood')
  expect(elT).toBeDefined()
  expect(elT).toBeVisible()
  const elA = screen.getByText('Author: Tim Urban')
  expect(elA).toBeDefined()
  expect(elA).toBeVisible()

  const elU = screen.getByText('https://waitbutwhy.com/2025/10/toddler.html')
  expect(elU).toBeDefined()
  expect(elU).toBeVisible()
  const elL = screen.getByText('Likes: 6')
  expect(elL).toBeDefined()
  expect(elL).toBeVisible()

  const likeButton = screen.getByRole('button', { name: 'Like' })
  expect(likeButton).toBeDefined()

  const deleteButton = screen.getByRole('button', { name: 'Delete' })
  expect(deleteButton).toBeDefined()
})
