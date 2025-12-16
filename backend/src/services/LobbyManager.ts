import { GameManager } from "./game/GameManager.js"
import { Socket } from "socket.io";


export class LobbyManager {
    // Attributes
    private waitingList: Socket[];
    private gameList: Map<string, GameManager> = new Map();;



    // Constructor
    constructor() {
        this.waitingList = [];
        this.gameList = new Map();

    }

    // Methods
    public handleNewPlayer(socket: Socket) {
        console.log(`New Player handled: ${socket.id}`);

        socket.on('join_queue', () => {
        this.addToQueue(socket);
        });

        socket.on('leave_queue', () => {
        this.removeFromQueue(socket);
        });

        socket.on('disconnect', () => {
        this.handleDisconnect(socket);
        });

        socket.on('leave_game', (data) => {
            const { gameId } = data;
            const playerId = socket.id;

            const game = this.gameList.get(gameId);
            if (game) {
                const shouldDelete = game.removePlayer(playerId);
                if (shouldDelete) {
                    this.gameList.delete(gameId);
                } 
            }


        });

    }



    // ===== { SOCKET FUNCTIONS } =====
    private addToQueue(socket: Socket) {
        this.waitingList.push(socket);
        console.log(`Player ${socket.id} joined queue`);
        console.log(`Players in Queue [${this.waitingList.map(s => s.id).join(', ')}]`);


        this.checkForMatch(); // Try to create a game
    }

    private removeFromQueue(socket: Socket) {
        this.waitingList = this.waitingList.filter(s => s.id !== socket.id);
        console.log(`Player ${socket.id} has left queue`);
    }

    private handleDisconnect(socket: Socket) {
        this.removeFromQueue(socket);

        // Logic to remove player from a game

        console.log(`Player ${socket.id} disconnected`);
    }
    
    
    // ===== { CREATING A MATCH } =====
    private checkForMatch() {
        if (this.waitingList.length >= 2) {
            const player1 = this.waitingList.shift()!;
            const player2 = this.waitingList.shift()!;
        
            this.createGame(player1, player2);
        }
    }

    private createGame(player1: Socket, player2: Socket) {
        const gameId = this.generateGameId();
        const gameManager = new GameManager(gameId, player1, player2);

        this.gameList.set(gameId, gameManager);
        setTimeout(() => {
            player1.emit('match_found', {
            gameId,
            yourSymbol: 'X',
            opponent: player2.id,
            players: [player1.id, player2.id]
            });

        player2.emit('match_found', {
            gameId,
            yourSymbol: 'O',
            opponent: player1.id,
            players: [player1.id, player2.id]
            });


        }, 100);
        

        console.log(`Game ${gameId} created with players ${player1.id} and ${player2.id}`);
    }

    private generateGameId(): string {
        // Creates IDs like: "game_1641234567890_abc123def"
        return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }



}