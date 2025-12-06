import { useState } from 'react'

import MenuPage from './pages/menu'
import GamePage from './pages/game'


function App() {
  const [currentPage, setCurrentPage] = useState('menu');

  if (currentPage === 'menu') {
    return <MenuPage onStartGame={() => setCurrentPage('game')} />
  }

  if (currentPage === 'game') {
    return <GamePage/>
  }
}


export default App
