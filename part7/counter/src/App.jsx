import useCounter from './hooks/useCounter'

function App() {
  const counter = useCounter()


  return (
    <div>
      <div>
        {counter.counter}
      </div>
      <div><button onClick={() => counter.increment()}>Plus</button><button onClick={() => counter.zero()}>Zero</button><button onClick={() => counter.decrement()}>Minus</button></div>
    </div>
  )
}

export default App
