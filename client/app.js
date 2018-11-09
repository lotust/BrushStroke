import React from 'react'

import {Navbar, HanziQuiz} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <HanziQuiz />
    </div>
  )
}

export default App
