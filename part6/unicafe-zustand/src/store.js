import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useFeedbackStore = create(set => ({
  good: 0, 
  neutral: 0, 
  bad: 0,
  giveGood: () => (set(state => ({ good: state.good + 1}))),
  giveNeutral: () => (set(state => ({ neutral: state.neutral + 1}))),
  giveBad: () => (set(state => ({ bad: state.bad + 1}))),
}))

export const useFeedback = () => useFeedbackStore(useShallow(state => ({ 
  good: state.good, 
  neutral: state.neutral, 
  bad: state.bad,
})))
export const useFeedbackControls = () => useFeedbackStore(useShallow(state => ({ 
  giveGood: state.giveGood, 
  giveNeutral: state.giveNeutral, 
  giveBad: state.giveBad,
})))