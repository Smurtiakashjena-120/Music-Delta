import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUP from './components/SignUp'
import Playlist from './components/Playlist'
function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home></Home>}></Route>
      <Route path='/' element={<SignIn></SignIn>}></Route>
      <Route path='/signup' element={<SignUP></SignUP>}></Route>
      <Route path='/playlist' element={<Playlist></Playlist>}></Route>

     </Routes>
     
     </BrowserRouter>
      
    </>
  )
  

}

export default App
