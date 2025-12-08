import { useState } from 'react'
import './game.css'

function GamePage() {

  return (
    <>
    <div className="game-layout">
        <div className="game-header">
            {/* Title Div */}
            <div className="title">
                <h1>Tic Tac Toe</h1>
            </div> 

            {/* Turn Indicator */}
            <div className="turn-indicator">
                <p>Arrow left</p>
                <h1>You're Turn/Awaiting Opponent</h1>
                <p>Arrow right</p>

            </div>
        </div>

        <div className="game-area">
            {/* Enemy Screen Div */}
            <div className="player-status">
                <h1>Player</h1>
                <p>You are:</p>
                <p>SYMBOL</p>

            </div>

            {/* Game field */}
            <div className="game-board">
                <h1>Grid</h1>
                <h1>Grid</h1>
                <h1>Grid</h1>
                <h1>Grid</h1>
                <h1>Grid</h1>
                <h1>Grid</h1>
                <h1>Grid</h1>
                <h1>Grid</h1>
                <h1>Grid</h1>
            </div>
            
            {/* Enemy Screen Div */}
            <div className="player-status">
                <h1>Opponent</h1>
                <p>The opponent is:</p>
                <p>SYMBOL</p>

            </div>

        </div>
    </div>


    </>
  )
}

export default GamePage
