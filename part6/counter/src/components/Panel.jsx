import Controls from './Controls'
import Display from './Display'

const Panel = () => {
  const style = {
    display: 'flex',
    gap: '2px', 
    flexDirection: 'column',
    alignItems: 'flex-start'

  }
  return (
    <div style={style}>
      <Display />
      <Controls />
    </div>
  )
}

export default Panel