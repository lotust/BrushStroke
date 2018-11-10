import React from 'react'

import {Navbar, NavBottom} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <NavBottom />
    </div>
  )
}

export default App
