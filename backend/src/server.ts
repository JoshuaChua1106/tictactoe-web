import { createServer } from "http";
import app from './app.js'
import { PORT, FRONT_END_URL } from "./config/index.js";

import { Server } from "socket.io";
import { LobbyManager } from "./services/LobbyManager.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: FRONT_END_URL,
        methods: ["GET", "POST"]
    }
});

// ===== { Setting up LobbyManager Singleton } =====
const lobbyManager = new LobbyManager();

io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);

    lobbyManager.handleNewPlayer(socket);
})

// ===== { Setting up the backend server } =====
httpServer.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

})