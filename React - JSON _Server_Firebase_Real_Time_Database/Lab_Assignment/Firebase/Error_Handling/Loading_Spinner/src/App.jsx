import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FetchData from './Task_3/crud'

function App() {

  return (
    <>
      <h1>Display Loading Spinnner</h1>
      <FetchData />
    </>
  )
}

export default App
