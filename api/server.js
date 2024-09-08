const express = require('express');
const http = require('http'); // Importujemy moduł HTTP
const { Server } = require('socket.io'); // Importujemy Socket.IO
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const locationRoutes = require('./routes/locationRoutes');
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app); // Tworzymy serwer HTTP

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Adres twojego frontendu
        methods: ['GET', 'POST'], // Dopuszczalne metody HTTP
        allowedHeaders: ['Content-Type'], // Dopuszczalne nagłówki
        credentials: true
    }
});

const port = 5001;

// Połącz z MongoDB
connectDB();

// Middleware
const corsOptions = {
    origin: 'http://localhost:3000', // frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

// Routes
app.use('/api', eventRoutes);
app.use('/api', locationRoutes);

// Obsługa Socket.IO
io.on('connection', (socket) => {
    console.log('Nowy użytkownik połączony');

    // Obsługa wysyłania wiadomości
    socket.on('chatMessage', (message) => {
        // Emitujemy wiadomość do wszystkich podłączonych klientów
        io.emit('chatMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Użytkownik rozłączony');
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
