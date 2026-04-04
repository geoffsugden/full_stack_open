import { useState } from "react"



const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {

  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

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
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad}/>
          <StatisticLine text="average" value={average()}/>
          <StatisticLine text="positive" value={positive()+"%"}/>
        </tbody>
      </table>
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
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />

      
    </div>
  )
}

export default App