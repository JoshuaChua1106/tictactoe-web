import { useNavigate } from 'react-router-dom'

function LobbyPage() {
    const navigate = useNavigate();

  return (
    <>
    <div className='menu-page'>
        <h1>Welcome to the Lobby</h1>
        <h2>Waiting for players</h2>
        <p>This is a game made by Joshua where you can quickly enter a game of Tic-Tac-Toe in a comfortable and cozy environment</p>
    </div>
    </>
  )
}

export default LobbyPage