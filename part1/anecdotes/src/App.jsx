import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
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
      <h1>Hello, Would you like an anecdote?</h1>
      <Button onClick={handleNextClick} text="Push Me" />
      <p>{anecdotes[anecData.selected]}</p>
      <Button onClick={handleVoteClick} text="Vote for this Anecdote" />
      <p>This anecdote has {anecData.anecVotes[anecData.selected]} votes. If you'd like it to have more you know what to do!</p>
    </div>
  )
}

export default App