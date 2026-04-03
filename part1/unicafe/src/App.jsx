import { useState } from "react"



const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = ({good, bad, neutral}) => {

  const average = () => {
    if(good || bad) {
      return (good-bad)/(good + neutral + bad)
    } else {
      return 0
    }
  }

  const positive = () => {
    if(good || bad) {
      return (good)/(good+bad+neutral)*100
    } else {
      return 0 
    }
  }
  
  if (good || bad || neutral) {
    return ( 
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {good + neutral + bad}</p>
        <p>average {average()}</p>
        <p>positive {positive()}%</p>
      </div>
    ) 
  } else {
    return (
      <div><p>No feedback given</p></div>
    )
  }
}

const App = () => {
  
  const[good, setGood] = useState(0)
  const[neutral, setNeutral] = useState(0)
  const[bad, setBad] = useState(0)
  
  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)



  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
      
    </div>
  )
}

export default App