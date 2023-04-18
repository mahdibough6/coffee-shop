import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Dashboard from './dashboard/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App bg-green-100">
     <Dashboard/> 
    </div>
  )
}

export default App
