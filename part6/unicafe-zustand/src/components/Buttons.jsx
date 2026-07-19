import { useFeedbackControls } from '../store'

const Buttons = () => {
  const { giveGood, giveNeutral, giveBad } = useFeedbackControls()
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={giveGood}>good</button>
      <button onClick={giveNeutral}>neutral</button>
      <button onClick={giveBad}>bad</button>
    </div>
  )
}

export default Buttons
