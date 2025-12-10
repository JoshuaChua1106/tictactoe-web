import type { Socket } from "socket.io";
import { TicTacToeGame } from "./TicTacToeGame.js";

export class GameManager {

    // Attributes
    private gameId: string;

    private player1id: string;
    private player2id: string;

    private player1Socket: Socket;
    private player2Socket: Socket;

    private game: TicTacToeGame;

    private player1Symbol = 'X';
    private player2Symbol = 'O';


    // Constructor

    constructor(gameId: string, player1: Socket, player2: Socket){
        this.gameId = gameId;
        
        this.player1Socket = player1;
        this.player2Socket = player2;

        this.player1id = this.player1Socket.id;
        this.player2id = this.player2Socket.id;

        this.game = new TicTacToeGame(this.gameId, this.player1id, this.player2id);

        this.setupEventListeners();

    }


    // Methods
    private setupEventListeners() {
        // ===== { PLAYER 1 SOCKETS} =====
        this.player1Socket.on('make_move', (data) => {
            const { x, y } = data;
            const symbol = this.getPlayerSymbol(this.player1Socket.id);
            this.game.makeMove(x, y, symbol);
        });

        // ===== { PLAYER 2 SOCKETS} =====
        this.player2Socket.on('make_move', (data) => {
            const { x, y } = data;
            const symbol = this.getPlayerSymbol(this.player2Socket.id);
            this.game.makeMove(x, y, symbol);
        });
    }


    // Getter
    private getPlayerSymbol(socketId: string): 'X' | 'O' {
        if (socketId === this.player1Socket.id) return 'X';
        if (socketId === this.player2Socket.id) return 'O';
        throw new Error('Invalid player');

    }

}
