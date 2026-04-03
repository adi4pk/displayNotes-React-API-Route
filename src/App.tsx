import { useState } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}></Route>   //MUST name this path '/' -- this is the default path found by REACT Router
          <Route path='/main' element={<Home/>}></Route>
      </Routes>
    
    </BrowserRouter>
        
    </>
  )
}

export default App
