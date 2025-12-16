import { useNavigate } from 'react-router-dom'
import { socket } from '../socket';
import { useEffect } from 'react';

function LobbyPage() {
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('match_found', (data) => {
            navigate('/game', {
                state: {
                    gameId: data.gameId,
                    yourSymbol: data.yourSymbol,
                    opponent: data.opponent
                }
            });
        })
    });

  return (
    <>
    <div className='menu-page'>
        <h1>Welcome to the Lobby</h1>
        <h2>Waiting for players</h2>
    </div>
    </>
  )
}

export default LobbyPage