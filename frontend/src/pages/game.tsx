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
                <div className="circle"></div>

            </div>

            {/* Game field */}
            <div className="game-board">
                <div className="card-square"></div>
                <div className="card-square"></div>
                <div className="card-square"></div>
                <div className="card-square"></div>
                <div className="card-square"></div>
                <div className="card-square"></div>
                <div className="card-square"></div>
                <div className="card-square"></div>
                <div className="card-square"></div>
            </div>
            
            {/* Enemy Screen Div */}
            <div className="player-status">
                <h1>Opponent</h1>
                <p>The opponent is:</p>
                <div className="cross"></div>

            </div>

        </div>
    </div>


    </>
  )
}

export default GamePage
