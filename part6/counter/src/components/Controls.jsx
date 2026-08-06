import useCounter from '../hooks/useCounter'

const Controls = () => {
  const { increment, decrement, zero } = useCounter()
  
  const style = {
    display: 'flex',
    flexDirection: 'row',
    gap: '2px',
    paddingBottom: '10px'
  }
  return (
    <div style={style}>
      <button onClick={increment}>plus</button>
      <button onClick={decrement}>minus</button>
      <button onClick={zero}>zero</button>
    </div>
  )
}

export default Controls