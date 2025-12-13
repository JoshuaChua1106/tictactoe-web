import { socket } from '../socket';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './game.css'

function GamePage() {

    const location = useLocation();
    const { gameId, yourSymbol, opponent } = location.state || {};

    const [board, setBoard] = useState(Array(3).fill(null).map(() => Array(3).fill(null)));
    const [currentTurn, setCurrentTurn] = useState('X');
    const [gameOver, setGameOver] = useState(null);
    const [gameInitialized, setGameInitialized] = useState(false);


    const makeMove = (x : number, y : number) => {
        if (board[x][y] !== null || gameOver !== null) return;

        console.log(`Clicked square ${x}, ${y}`);
        socket.emit('make_move', { x, y });

    }

    useEffect(() => {
        socket.emit('player_ready');
   }, []);

    useEffect(() => {
        socket.on('game_update', (data) => {
            setBoard(data.board);
            setCurrentTurn(data.currentTurn);
            setGameOver(data.gameOver);
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
                <div className = "turn-triangle-left"></div>
                <h1>You're Turn/Awaiting Opponent</h1>
                <div className = "turn-triangle-right"></div>

            </div>
        </div>

        <div className="game-area">
            {/* Enemy Screen Div */}
            <div className="player-status">
                <h1>Player</h1>
                <p>You are:</p>
                 <div className={yourSymbol === 'O' ? 'circle' : 'cross'}>
                </div>

            </div>

            {/* Game field */}
            <div className="game-board">
                <div className="card-square" onClick={() => makeMove(0, 0)}>
                    {board[0][0] && (
                    <div className={board[0][0] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className="card-square" onClick={() => makeMove(0, 1)}>                        
                    {board[0][1] && (
                    <div className={board[0][1] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className="card-square" onClick={() => makeMove(0, 2)}>
                    {board[0][2] && (
                    <div className={board[0][2] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className="card-square" onClick={() => makeMove(1, 0)}>
                    {board[1][0] && (
                    <div className={board[1][0] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className="card-square" onClick={() => makeMove(1, 1)}>
                    {board[1][1] && (
                    <div className={board[1][1] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className="card-square" onClick={() => makeMove(1, 2)}>
                    {board[1][2] && (
                    <div className={board[1][2] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className="card-square" onClick={() => makeMove(2, 0)}>
                    {board[2][0] && (
                    <div className={board[2][0] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className="card-square" onClick={() => makeMove(2, 1)}>
                    {board[2][1] && (
                    <div className={board[2][1] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
                <div className="card-square" onClick={() => makeMove(2, 2)}>
                    {board[2][2] && (
                    <div className={board[2][2] === 'X' ? 'cross' : 'circle'}/>)}
                </div>
            </div>
            
            {/* Enemy Screen Div */}
            <div className="player-status">
                <h1>Opponent</h1>
                <p>The opponent is:</p>
                <div className={yourSymbol === 'O' ? 'cross' : 'circle'}>
                </div>

            </div>

        </div>
    </div>


    </>
  )
}

export default GamePage
