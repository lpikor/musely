import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Message from './Message/Message';
import './Chat.css';
import { getAuth } from 'firebase/auth';

const socket = io('http://localhost:5001', {
  transports: ['websocket'], // Wymuszamy użycie WebSocket
  withCredentials: true
});

function Chat() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [user, setUser] = useState('');

    const messagesEndRef = useRef(null); // Referencja do końca listy wiadomości

    // Funkcja przewijająca na dół listy wiadomości
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

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

    // Scrollujemy za każdym razem, gdy chat się zmieni (czyli gdy przyjdzie nowa wiadomość)
    useEffect(() => {
        scrollToBottom();
    }, [chat]);

    const sendMessage = (e) => {
        e.preventDefault();
    
        const auth = getAuth();
        const currentUser = auth.currentUser;
    
        if (currentUser) {
            const senderId = currentUser.uid; // Pobieramy uid zamiast e-maila
            const newMessage = { message, senderId };
    
            // Wysyłanie wiadomości przez Socket.io
            socket.emit('chatMessage', newMessage);
    
            // Wysyłanie wiadomości do API backendu
            fetch('http://localhost:5001/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMessage)
            })
            .then((res) => res.json());
    
            setMessage(''); // Wyczyść pole wiadomości
        } else {
            console.log('Użytkownik nie jest zalogowany');
        }
    };

    const removeAllMessages = () => {
        fetch('http://localhost:5001/api/messages', {
            method: 'DELETE'
        });
        setChat([]);
        socket.emit('deleteMessages');
    };

    return (
        <div className="chat">
            <h2>Chat</h2>
            <ul className="messages-list">
                {chat.map((msg, index) => (
                    <li key={index}>
                        <Message senderId={msg.senderId} message={msg.message} />
                    </li>
                ))}
                {/* Niewidoczny element, który przewijamy na dół */}
                <div ref={messagesEndRef}></div>
            </ul>
            <form className="chat-form" onSubmit={sendMessage}>
                <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Wyślij</button>
            </form>
            <button className="remove-all-messages" onClick={removeAllMessages}>Usuń wszystkie wiadomości</button>
        </div>
    );
}

export default Chat;
