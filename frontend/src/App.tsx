import { useState } from 'react'

import MenuPage from './pages/menu'

function App() {
  const [currentPage, setCurrentPage] = useState('menu');

  if (currentPage === 'menu') {
    return <MenuPage onStartGame={() => setCurrentPage('game')} />
  }
}


export default App
