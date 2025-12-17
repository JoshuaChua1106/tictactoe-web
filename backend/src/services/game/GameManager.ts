import { Socket } from "socket.io";
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

    private playerList = new Set<string>();
    private playersReady = new Set<string>();

    // Rate limiting
    private lastMoveTime = new Map<string, number>();


    // Constructor

    constructor(gameId: string, player1: Socket, player2: Socket){
        this.gameId = gameId;
        
        this.player1Socket = player1;
        this.player2Socket = player2;

        this.player1id = this.player1Socket.id;
        this.player2id = this.player2Socket.id;

        this.playerList.add(this.player1id);
        this.playerList.add(this.player2id);


        this.game = new TicTacToeGame(this.gameId, this.player1id, this.player2id);

        this.setupEventListeners();

    }


    // Methods
    private setupEventListeners() {
        // ===== { PLAYER 1 SOCKETS} =====
        this.player1Socket.on('player_ready', () => {
            this.handlePlayersReady(this.player1Socket.id);
        });


        this.player1Socket.on('make_move', (data) => {
            
            if (!data || typeof data !== 'object') {
                this.player1Socket.emit('error', {message: "Invalid data format"});
            }

            const { x, y } = data;

            if (typeof x !== 'number' || typeof y !== 'number') {
                this.player1Socket.emit('error', {message: "Coordinates must be numbers"});
            }

            if (x < 0 || x > 2 || y < 0 || y > 2) {
                this.player1Socket.emit('error', {message: "Coordinates must be between 0-2"});
                return;
            }


            const symbol = this.getPlayerSymbol(this.player1Socket.id);
            this.game.makeMove(x, y, symbol);
            this.broadcastGameState();

        });

        // ===== { PLAYER 2 SOCKETS} =====
        this.player2Socket.on('player_ready', () => {
            this.handlePlayersReady(this.player2Socket.id);
        });

        this.player2Socket.on('make_move', (data) => {
            if (this.isRateLimited(this.player2Socket.id)) {
                this.player1Socket.emit('error', { message: 'Too fast! Slow down.' });
                return;
            }


            if (!data || typeof data !== 'object') {
                this.player2Socket.emit('error', {message: "Invalid data format"});
                return;
            }

            const { x, y } = data;

            if (typeof x !== 'number' || typeof y !== 'number') {
                this.player2Socket.emit('error', {message: "Coordinates must be numbers"});
            }

            if (x < 0 || x > 2 || y < 0 || y > 2) {
                this.player2Socket.emit('error', {message: "Coordinates must be between 0-2"});
                return;
            }
            const symbol = this.getPlayerSymbol(this.player2Socket.id);

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
    } 

    public removePlayer(socketId: string) : boolean {
        this.playerList.delete(socketId);

        if (socketId === this.player1id) {
          this.player1Socket.removeAllListeners('player_ready');
          this.player1Socket.removeAllListeners('make_move');
        } else if (socketId === this.player2id) {
          this.player2Socket.removeAllListeners('player_ready');
          this.player2Socket.removeAllListeners('make_move');
        }

        return this.playerList.size === 0;
        
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

    }

    private handlePlayersReady(playerId: string): void {
        this.playersReady.add(playerId);

        if(this.playersReady.size === 2) {
            this.startGame();
        }
    }

    private isRateLimited(playerId: string): boolean {
        const now = Date.now();
        const lastMove = this.lastMoveTime.get(playerId) || 0;

        if (now - lastMove < 500) {
            return true;
        }

        this.lastMoveTime.set(playerId, now);
        return false;
    }


}
