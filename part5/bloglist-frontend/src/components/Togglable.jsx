import { useState, useImperativeHandle } from 'react'


const Togglable = (props) => {
  const [visible, setVisibility] = useState(false)

  const toggleVisibility = () => setVisibility(!visible)

  const dontShow = { display: visible ? 'none' : '' }
  const doShow = { display: visible ? '' : 'none' }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  const cName = props.cName ?? 'togglable'
  const showLabel = props.buttonShowLabel ?? 'Show'
  const hideLabel = props.buttonHideLabel ?? 'Cancel'

  return (
    <div className={cName}>
      <div style={dontShow}>
        <button onClick={toggleVisibility}>{showLabel}</button>
      </div>
      <div style={doShow} >
        {props.children}
        <button onClick={toggleVisibility}>{hideLabel}</button>
      </div>
    </div>
  )
}

export default Togglable

