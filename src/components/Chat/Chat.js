import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5001', {
  transports: ['websocket'], // Wymuszamy użycie WebSocket
  withCredentials: true
});

function Chat() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.on('chatMessage', (message) => {
            setChat((prevChat) => [...prevChat, message]);
        });

        return () => {
            socket.off('chatMessage'); // Zatrzymanie nasłuchiwania po odmontowaniu komponentu
        };
    }, []);

    const sendMessage = (e) => {
        socket.emit('chatMessage', message); // Wyślij wiadomość na serwer
        e.preventDefault();
        setMessage(''); // Wyczyść pole wiadomości
    };

    return (
        <div>
            <h1>Chat</h1>
            <div>
                {chat.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Wyślij</button>
            </form>
        </div>
    );
}

export default Chat;
