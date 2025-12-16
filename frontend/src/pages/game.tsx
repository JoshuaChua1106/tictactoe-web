import { socket } from '../socket';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


import './game.css'

function GamePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { gameId, yourSymbol, opponent } = location.state || {};

    const [board, setBoard] = useState(Array(3).fill(null).map(() => Array(3).fill(null)));
    const [currentTurn, setCurrentTurn] = useState('X');
    const [gameOver, setGameOver] = useState(null);
    const [gameInitialized, setGameInitialized] = useState(false);
    const [winningLine, setWinningLine] = useState<[number, number][] | null>(null);

    const opponentSymbol = yourSymbol === 'O' ? 'X' : 'O';

    const handlePlayAgain = () => {
        socket.emit('join_queue');
        console.log('Joining matchmaking queue...');
        navigate("/lobby");
    };

    const makeMove = (x : number, y : number) => {
        if (board[x][y] !== null || gameOver !== null) return;

        console.log(`Clicked square ${x}, ${y}`);
        socket.emit('make_move', { x, y });

    }

    const isWinningSquare = (row : number, col : number) => {
        return winningLine?.some(([x, y]) => x === row && y === col) || false;
    }

    useEffect(() => {
        socket.emit('player_ready');
   }, []);

    useEffect(() => {
        socket.on('game_update', (data) => {
            setBoard(data.board);
            setCurrentTurn(data.currentTurn);
            setGameOver(data.gameOver);
            setWinningLine(data.winningLine);

            setGameInitialized(true);
        })

        return () => {socket.off('game_update');} 
    }, []);

  return (
    <>
    <div className="game-layout">
        <div className="game-header">
            {/* Title Div */}
            <div className="title">
                <h1>Tic Tac Toe</h1>
            </div> 

            {/* Turn Indicator */}
            <div className="turn-indicator-panel">
                <div className={`turn-triangle-left ${currentTurn === yourSymbol ? 'active' : 'inactive'}`}></div>
                <h1>{currentTurn === yourSymbol ? "Your Turn" : "Awaiting Opponent"}</h1>
                <div className={`turn-triangle-right ${currentTurn !== yourSymbol ? 'active' : 'inactive'}`}></div>

            </div>
        </div>

        <div className="game-area">
            {/* Player Screen Div */}
            <div className="player-status">
                <h1>Player</h1>
                <p>You are:</p>
                 <div className={`${yourSymbol === 'O' ? 'circle' : 'cross'} ${gameOver === yourSymbol ? 'win' : ''}`}>
                </div>

            </div>

            {/* Game field */}
            <div className="game-board">
                <div className={`card-square ${isWinningSquare(0,0) ? 'win' : ''}`} onClick={() => makeMove(0, 0)}>
                    {board[0][0] && (
                    <div className={board[0][0] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className={`card-square ${isWinningSquare(0,1) ? 'win' : ''}`} onClick={() => makeMove(0, 1)}>                        
                    {board[0][1] && (
                    <div className={board[0][1] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className={`card-square ${isWinningSquare(0,2) ? 'win' : ''}`} onClick={() => makeMove(0, 2)}>
                    {board[0][2] && (
                    <div className={board[0][2] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className={`card-square ${isWinningSquare(1,0) ? 'win' : ''}`} onClick={() => makeMove(1, 0)}>
                    {board[1][0] && (
                    <div className={board[1][0] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className={`card-square ${isWinningSquare(1,1) ? 'win' : ''}`} onClick={() => makeMove(1, 1)}>
                    {board[1][1] && (
                    <div className={board[1][1] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className={`card-square ${isWinningSquare(1,2) ? 'win' : ''}`} onClick={() => makeMove(1, 2)}>
                    {board[1][2] && (
                    <div className={board[1][2] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className={`card-square ${isWinningSquare(2,0) ? 'win' : ''}`} onClick={() => makeMove(2, 0)}>
                    {board[2][0] && (
                    <div className={board[2][0] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className={`card-square ${isWinningSquare(2,1) ? 'win' : ''}`} onClick={() => makeMove(2, 1)}>
                    {board[2][1] && (
                    <div className={board[2][1] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className={`card-square ${isWinningSquare(2,2) ? 'win' : ''}`} onClick={() => makeMove(2, 2)}>
                    {board[2][2] && (
                    <div className={board[2][2] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
            </div>
            
            {/* Enemy Screen Div */}
            <div className="player-status">
                <h1>Opponent</h1>
                <p>The opponent is:</p>
                <div className={`${yourSymbol === 'O' ? 'cross' : 'circle'} ${gameOver === opponentSymbol ? 'win' : ''}`}>
                </div>

            </div>

        </div>

        {gameOver && (
        <div className='game-end-section'>
            <div className='menu-button' onClick={handlePlayAgain}>Play Again</div>
            <div className='menu-button' onClick={() => navigate("/")}>Main Menu</div>
        </div>
        )}

    </div>


    </>
  )
}

export default GamePage
