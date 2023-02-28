import React from 'react'

import Dropdown from 'react-simple-dropdown'
import Options from 'react-simple-dropdown/src/components/Options'
import 'react-simple-dropdown/dist/index.css'

const App = () => {
  return (
    <>
      <Dropdown placeHolder="Select..." options={Options} />
    </>
  )

}

export default App
