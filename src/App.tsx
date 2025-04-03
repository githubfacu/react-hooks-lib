import './App.css'

import { useCounter } from './hooks/useCounter'

function App() {
  const {value, increment} = useCounter({initialValue: 0})

  return (
    <>
    <button type="button" onClick={() => increment()}>
      +1 
    </button>
    <br />
    <span>value: {value}</span>
    </>
  )
}

export default App