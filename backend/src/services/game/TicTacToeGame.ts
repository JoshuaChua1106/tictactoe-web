type Board = ('X' | 'O' | null)[][];

export class TicTacToeGame {
    // Attributes
    private id: string;
    private board: Board;

    private players: Map<string, 'X' | 'O'>; // Maps socketId to symbol

    private player1: string;
    private player2: string;

    private currentTurn: 'X' | 'O';
    private winner: 'X' | 'O' | 'Draw' | null = null;

    private gameOver: 'draw' | 'O' | 'X' | null;




    // Constructor
    constructor(id: string, player1: string, player2: string){
        this.id = id;

        this.player1 = player1;
        this.player2 = player2;

        this.board = Array(3).fill(null).map(() => Array(3).fill(null));

        this.players = new Map();
        this.players.set(player1, 'X');
        this.players.set(player2, 'O');
        
        this.currentTurn = 'X';

        this.gameOver = null;

    }


    // Methods

    private checkWin(symbol: 'X' | 'O' | null) : boolean {
        if (!this.board[0] || !this.board[1] || !this.board[2]) return false;

        const lines = [
            [this.board[0][0], this.board[0][1], this.board[0][2]], // Row 1
            [this.board[1][0], this.board[1][1], this.board[1][2]], // Row 2
            [this.board[2][0], this.board[2][1], this.board[2][2]], // Row 3
            [this.board[0][0], this.board[1][0], this.board[2][0]], // Column 1
            [this.board[0][1], this.board[1][1], this.board[2][1]], // Column 2
            [this.board[0][2], this.board[1][2], this.board[2][2]], // Column 3
            [this.board[0][0], this.board[1][1], this.board[2][2]], // Diagonal (top-left to bottom-right)
            [this.board[2][0], this.board[1][1], this.board[0][2]], // Diagnoal (bottom-left to top-right)
        ]
        
        
        return lines.some(line => line.every(cell => cell === symbol));
    }

    private checkBoardFull() : boolean {
        const isFull = this.board.every(row => row.every(cell => cell !== null));

        return isFull;

    }
    
    private switchTurns() : void {
        this.currentTurn = this.currentTurn === 'X' ? 'O' : 'X';
    }
    
    private makeMove(x_value: number, y_value: number, playerSymbol: 'X' | 'O') : boolean {
        // Check if Board is valid
        if (!this.board[0] || !this.board[1] || !this.board[2]) return false;

        // Check if the current turn is the players
        if (this.currentTurn != playerSymbol){ return false }
            
        // Check if the move is valid
        if (!(x_value >= 0 && x_value <= 2 && y_value >= 0 && y_value <= 2)) { return false; } 
        
        // Check if board[x_value] is available
        if (!this.board[x_value]) { return false; }
        
        // Check if there is already a piece in the chosen square
        if (this.board[x_value][y_value] != null){ return false; }

        // If all the checks above pass, continue with the logic
        this.board[x_value][y_value] = playerSymbol;
        
        // Check if there is a winner
        if (this.checkWin(playerSymbol)) {
            this.gameOver = playerSymbol;
            return true;
        }

        // Check if there is a draw
        if (this.checkBoardFull()) {
            this.gameOver = 'draw';
            return true;
        }

        // Switch turns at the end
        this.switchTurns();

        return true;
    }

    public getPublicState() : Board {
        return this.board;
    }




}