import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Message from './Message/Message';

const socket = io('http://localhost:5001', {
  transports: ['websocket'], // Wymuszamy użycie WebSocket
  withCredentials: true
});

function Chat() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [user, setUser] = useState('');

    useEffect(() => {
        fetch('http://localhost:5001/api/messages', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => setChat(data));
            
        socket.on('chatMessage', (message) => {
            setChat((prevChat) => [...prevChat, message]);
        });

        socket.on('deleteMessages', () => {
            setChat([]);
        });

        return () => {
            socket.off('chatMessage'); // Zatrzymanie nasłuchiwania po odmontowaniu komponentu
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        const senderId = user;
        const newMessage = { message, senderId };
        
        socket.emit('chatMessage', newMessage);

        fetch('http://localhost:5001/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMessage)
        })
            .then((res) => res.json())
        setMessage(''); // Wyczyść pole wiadomości
    };

    const removeAllMessages = () => {
        fetch('http://localhost:5001/api/messages', {
            method: 'DELETE'
        });
        setChat([]);
        socket.emit('deleteMessages');
    };

    return (
        <div>
            <h1>Chat</h1>
            <button onClick={removeAllMessages}>Usuń wszystkie wiadomości</button>
            <ul>
                {chat.map((msg, index) => (
                    <li key={index}>
                    <Message senderId={msg.senderId} message={msg.message} />
                    </li>
                ))}
            </ul>
            <form onSubmit={sendMessage}>
                <input
                    type="text" 
                    placeholder="User"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
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
