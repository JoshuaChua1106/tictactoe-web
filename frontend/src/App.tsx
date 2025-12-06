import { useState } from 'react'

import MenuPage from './pages/menu'

function App() {
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState('menu');

  if (currentPage === 'menu') {
    return <MenuPage onStartGame={() => setCurrentPage('game')} />
  }
}


export default App
