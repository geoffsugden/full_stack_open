import { useState } from 'react'

const useField = ({ id, type, label }) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    const newValue = event ? event.target.value : ''
    setValue(newValue)
  }

  const reset = () => setValue('')

  return { id, label, type, value, onChange, reset }
}

export default useField
