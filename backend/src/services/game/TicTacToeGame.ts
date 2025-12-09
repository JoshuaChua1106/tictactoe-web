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



    // Constructor
    constructor(id: string, player1: string, player2: string){
        this.id = id;

        this.player1 = player1;
        this.player2 = player2;

        this.board = Array(3).fill(null).map(() => Array(3).fill(null));

        this.players = new Map();
        this.players.set(player1, 'X');
        this.players.set(player2, 'O');
        
        this.currentTurn = 'O';
    }


    // Methods

    private checkWin(symbol: 'X' | 'O' | null) : boolean {
        if (!this.board[0] || !this.board[1] || !this.board[2]) return false;

        const lines = [
            [this.board[0][0], this.board[0][1], this.board[0][2]], // Row 1
            [this.board[1][0], this.board[1][1], this.board[1][2]], // Row 2
            [this.board[2][0], this.board[2][1], this.board[2][2]], // Row 3
            [this.board[0][0], this.board[0][1], this.board[0][2]], // Column 1
            [this.board[1][0], this.board[1][1], this.board[1][2]], // Column 2
            [this.board[2][0], this.board[2][1], this.board[2][2]], // Column 3
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
    }
    
    private makeMove() : void {
        
    }

    public getPublicState() : void {

    }




}