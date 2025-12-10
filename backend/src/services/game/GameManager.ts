import type { Socket } from "socket.io";

export class GameManager {

    // Attributes
    private player1: Socket;
    private player2: Socket;

    // Constructor

    constructor(player1: Socket, player2: Socket){
        this.player1 = player1;
        this.player2 = player2;
        


    }


    // Methods



}
