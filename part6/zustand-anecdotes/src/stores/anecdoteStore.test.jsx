import { beforeEach, describe, expect, it, vi} from 'vitest'
import { render, screen, renderHook, act, within } from '@testing-library/react'
import '@testing-library/jest-dom'


vi.mock('../services/anecdotes', () => ({
  default: { 
    getAll: vi.fn(),
    update: vi.fn(),
  }
}))

import anecdoteService from '../services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './anecdoteStore'
import AnecdoteList from '../components/AnecdoteList'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from the service', async () => {
    const mockAnecdotes = [{ id:1, content: 'This is an anecdote.', votes: 0 }, 
      { id:2, content: 'This is also an Anecdote.', votes: 0 }
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it('anecdotes returned and displayed sorted by votes', async () => {
    const mockAnecdotes = [{ id:1, content: 'This is an anecdote.', votes: 2 }, 
      { id:2, content: 'This is also an Anecdote.', votes: 3 }, 
      { id:3, content: 'This is not an Anecdote.', votes: 0 }
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes.toSorted((a,b) => b.votes - a.votes))

    render(<AnecdoteList />)

    const voteElements = screen.getAllByText(/has \d+/)

    expect(voteElements[0]).toHaveTextContent('has 3')
    expect(voteElements[1]).toHaveTextContent('has 2')
    expect(voteElements[2]).toHaveTextContent('has 0')
  })

  it('anecdotes are filtered and displayed correctly', async () => {
    const mockAnecdotes = [{ id:1, content: 'Only this and one other anecdote will be shown.', votes: 2 }, 
      { id:2, content: 'This anecdote will be shown also.', votes: 3 }, 
      { id:3, content: 'This will not be shown', votes: 0 }
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())
    
    await act(async () => {
      await result.current.initialize()
    })

    await act(async () => {
      await result.current.setFilter('anecdote')
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    
    expect(anecdotesResult.current).toEqual(mockAnecdotes.filter(anecdote => anecdote.content.includes('anecdote')).toSorted((a,b) => b.votes - a.votes))

    render(<AnecdoteList />)

    const anecdotes = screen.getAllByText(/anecdote will be shown/)

    expect(anecdotes.length).toEqual(2)
  })

  it('anecdotes votes are increased when the vote button is clicked', async () => {
    const mockAnecdotes = [{ id:1, content: 'This anecdote will get a second vote.', votes: 1 }, 
      { id:2, content: 'This one will not.', votes: 1 }
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
    anecdoteService.update.mockImplementation(async (id, updatedData) => updatedData)

    const { result } = renderHook(() => useAnecdoteActions())
    
    await act(async () => {
      await result.current.initialize()
    })
    
    render(<AnecdoteList />)

    const anecdotesWithOneVotesBefore = screen.getAllByText(/has 1/)
    expect(screen.queryByText(/has 2/)).toBeNull()
    expect(anecdotesWithOneVotesBefore.length).toEqual(2)

    const secondVoteAnecdote = screen.getByText('This anecdote will get a second vote.').parentElement
    await act(() => {
      within(secondVoteAnecdote).getByRole('button', { name: 'vote' }).click()
    })
    
    
    expect(screen.getByText('This anecdote will get a second vote.').nextElementSibling).toHaveTextContent('has 2')  
    const anecdotesWithTwoVotesAfter = screen.getAllByText(/has 2/)
    const anecdotesWithOneVotesAfter = screen.getAllByText(/has 1/)

    expect(anecdotesWithTwoVotesAfter.length).toEqual(1)
    expect(anecdotesWithOneVotesAfter.length).toEqual(1)
  })
  

})