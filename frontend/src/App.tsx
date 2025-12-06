import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MenuPage from './pages/menu'
import GamePage from './pages/game'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage/>} />
        <Route path="/game" element={<GamePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}


export default App
