import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline m-5">
          Hello world!
        </h1>
      </div>
    </>
  )
}

export default App
