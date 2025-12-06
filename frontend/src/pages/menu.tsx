import { useState } from 'react'
import './menu.css'

interface MenuPageProps {
    onStartGame: () => void;
}

function MenuPage({ onStartGame } : MenuPageProps) {

  return (
    <>
    <div className='menu-page'>
        <h1>Tic Tac Toe</h1>
        <p>Welcome to ~Cozy~ Tic-Tac-Tae</p>
        <p>This is a game made by Joshua where you can quickly enter a game of Tic-Tac-Toe in a comfortable and cozy environment</p>
        <button onClick={onStartGame}>Play Game</button>
    </div>
    </>
  )
}

export default MenuPage
