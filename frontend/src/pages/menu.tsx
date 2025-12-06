import { useNavigate } from 'react-router-dom'

import './menu.css'


function MenuPage() {
    const navigate = useNavigate();

  return (
    <>
    <div className='menu-page'>
        <h1>Tic Tac Toe</h1>
        <p>Welcome to ~Cozy~ Tic-Tac-Tae</p>
        <p>This is a game made by Joshua where you can quickly enter a game of Tic-Tac-Toe in a comfortable and cozy environment</p>
        <button onClick={() => navigate("/game")}>Play Game</button>
    </div>
    </>
  )
}

export default MenuPage
