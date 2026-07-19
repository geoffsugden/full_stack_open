import { useCounterControls } from './store'

const Controls = () => {
  const { increment, decrement, zero }  = useCounterControls()

  return (
    <div>
      <button onClick={increment}>plus</button>
      <button onClick={decrement}>minus</button>
      <button onClick={zero}>zero</button>
    </div>
  )
}

export default Controls