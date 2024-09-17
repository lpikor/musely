import React, { useState, useEffect } from 'react';
import './Message.css';

function Message({ senderId, message }) {
    const [email, setEmail] = useState('Loading...');

    useEffect(() => {
        // Pobierz e-mail użytkownika na podstawie senderId (uid)
        const fetchEmail = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/user/${senderId}`);
                const data = await response.json();
                setEmail(data.email);
            } catch (error) {
                console.error('Error fetching email:', error);
                setEmail('Unknown User');
            }
        };

        fetchEmail();
    }, [senderId]);

    return (
        <div className="message">
            <span className="author">{email}</span>
            <p className="content">{message}</p>
        </div>
    );
}

export default Message;
