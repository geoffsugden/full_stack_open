import { render, screen } from '@testing-library/react'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import { create } from 'axios'

test('<NoteForm /> update parent state and calls onSubmit', async () => {
  const onNoteAdded = vi.fn()
  const user = userEvent.setup()
  render(<NoteForm onNoteAdded={onNoteAdded} />)

  const input = screen.getByPlaceholderText('This is where the note goes')
  const sendButton = screen.getByText('save')

  await user.clear(input)
  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(onNoteAdded.mock.calls).toHaveLength(1)
  expect(onNoteAdded.mock.calls[0][0].content).toBe('testing a form...')
})