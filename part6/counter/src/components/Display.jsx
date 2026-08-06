import useCounter from '../hooks/useCounter'

const Display = () => {
  const { counter } = useCounter()
  const style = {
    display: 'flex',
    width: '100%',
  }

  return (
    <div style={style}>{counter}</div>
  )
}

export default Display