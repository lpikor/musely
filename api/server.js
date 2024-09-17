const express = require('express');
const http = require('http'); // Importujemy moduł HTTP
const { Server } = require('socket.io'); // Importujemy Socket.IO
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const locationRoutes = require('./routes/locationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const connectDB = require('./config/db');
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccount.json');

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
app.use('/api', messageRoutes);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'musely-36fc1'
});

app.get('/api/user/:uid', async (req, res) => {
    const { uid } = req.params;

    try {
        const userRecord = await admin.auth().getUser(uid);
        console.log(`User found: ${userRecord.email}`);
        res.json({ email: userRecord.email });
    } catch (error) {
        console.error('Error fetching user data for UID:', uid, 'Error:', error.message);
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
});


// Obsługa Socket.IO
io.on('connection', (socket) => {
    console.log('Nowy użytkownik połączony');

    // Obsługa wysyłania wiadomości
    socket.on('chatMessage', (message) => {
        // Emitujemy wiadomość do wszystkich podłączonych klientów
        io.emit('chatMessage', message);
    });

    socket.on('deleteMessages', () => {
        io.emit('deleteMessages');
    });

    socket.on('disconnect', () => {
        console.log('Użytkownik rozłączony');
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
