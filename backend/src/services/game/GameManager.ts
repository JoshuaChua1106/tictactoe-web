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

    private playersReady = new Set<string>();

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
        this.player1Socket.on('player_ready', () => {
            this.handlePlayerReady(this.player1Socket.id);
        });


        this.player1Socket.on('make_move', (data) => {

            const { x, y } = data;
            const symbol = this.getPlayerSymbol(this.player1Socket.id);
            console.log(`emit obtained: Player 1 ${symbol} `);
            this.game.makeMove(x, y, symbol);
            this.broadcastGameState();

        });

        // ===== { PLAYER 2 SOCKETS} =====
        this.player2Socket.on('player_ready', () => {
            this.handlePlayerReady(this.player2Socket.id);
        });

        this.player2Socket.on('make_move', (data) => {


            const { x, y } = data;
            const symbol = this.getPlayerSymbol(this.player2Socket.id);
            console.log(`emit obtained: Player 2 ${symbol} `);

            this.game.makeMove(x, y, symbol);
            this.broadcastGameState();
        });
    }


    // Getter
    private getPlayerSymbol(socketId: string): 'X' | 'O' {
        if (socketId === this.player1Socket.id) return 'X';
        if (socketId === this.player2Socket.id) return 'O';
        throw new Error('Invalid player');

    }

    // ===== {SOCKET EMITS} =====
    public startGame(): void {
        this.broadcastGameState();
        console.log("Game started");

    } 


    // ===== { HELPER FUNCTIONS } =====
    private broadcastGameState() {
        const gameState = {
            board: this.game.getPublicState(),
            currentTurn: this.game.getCurrentTurn(),
            gameOver: this.game.getGameOver(),
            winningLine: this.game.getWinningLine()
        };

        this.player1Socket.emit('game_update', gameState);
        this.player2Socket.emit('game_update', gameState);

        console.log(gameState);
    }

    private handlePlayerReady(playerId: string): void {
        this.playersReady.add(playerId);

        if(this.playersReady.size === 2) {
            this.startGame();
        }
    }

}
