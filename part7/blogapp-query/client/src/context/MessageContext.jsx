import { createContext, useRef } from 'react'
import { useReducer } from 'react'

export const MessageContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'SET':
      return { msg: action.msg, msgType: action.msgType }
    case 'CLEAR':
      return { msg: null, msgType: null }
    default:
      return state
  }
}

export const MessageContextProvider = (props) => {
  const [message, dispatch] = useReducer(reducer, { msg: null, msgType: null })
  const timeoutId = useRef(null)

  const displayMessage = (message, timeout = 5_000) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    dispatch({ ...message, type: 'SET' })

    timeoutId.current = setTimeout(() => dispatch({ type: 'CLEAR' }), timeout)
  }

  return <MessageContext value={{ message, displayMessage }}>{props.children}</MessageContext>
}
