import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
    
  )
}

const PopularAnecdote = ({theAnecdotes, theVotes}) => {

  let max = theVotes[0]
  let maxIndex = 0

  for (var i = 1; i < theVotes.length; i++) {
    if(theVotes[i] > max) { 
      maxIndex = i
      max = theVotes[i]
    }
  }
  return (
    <div>
      <p>{theAnecdotes[maxIndex]}</p>
    </div>
    
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [anecData, setAnecData] = useState({
    selected: 0, 
    anecVotes: Array(anecdotes.length).fill(0)
  })

  const handleNextClick = () => {
    const randNum = parseInt(Math.random()*anecdotes.length)
    const copy = { ...anecData }
    copy.selected = randNum
    setAnecData(copy)
  }

  const handleVoteClick = () => {
    const copy = { ...anecData }
    copy.anecVotes[anecData.selected] += 1
    setAnecData(copy)
  }

  return (
    <div>
      <h2>Anecdote of the Day</h2>
      <p>{anecdotes[anecData.selected]}</p>
      <p>has {anecData.anecVotes[anecData.selected]} votes</p>
      <Button onClick={handleVoteClick} text="vote" />
      <Button onClick={handleNextClick} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <PopularAnecdote theAnecdotes={anecdotes} theVotes={anecData.anecVotes} />
    </div>
  )
}

export default App