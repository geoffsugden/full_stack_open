import { useState } from 'react'

const useCounter = () => {
  const[counter, setCounter] = useState(0)

  const increment = () => setCounter(counter + 1)
  const decrement = () => setCounter(counter - 1)
  const zero = () => setCounter(0)

  return {
    counter, 
    increment, 
    decrement, 
    zero
  }
}

export default useCounter

