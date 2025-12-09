import { createServer } from "http";
import app from './app.js'
import { PORT, FRONT_END_URL } from "./config/index.js";

const httpServer = createServer(app);

httpServer.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

})