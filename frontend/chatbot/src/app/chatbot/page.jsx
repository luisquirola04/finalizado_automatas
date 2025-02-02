"use client";

import { useState, useRef, useEffect } from "react";
import { chat } from "../../hooks/chatbot";
import "./chatbot.css"; 

export default function Chatbot() {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "¡Hola! Soy el asistente del Banco de Loja. ¿En qué puedo ayudarte?" }
    ]);
    const [input, setInput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const chatEndRef = useRef(null);

    const sendMessage = async () => {
        if (!input.trim() || isProcessing) return; // No procesar si está vacío o ya en curso

        setIsProcessing(true); // Marcar como en proceso
        const newUserMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, newUserMessage]);

        try {
            const response = await chat({ consulta: input });
            if (response.code === 200) {
                const botResponse = { sender: "bot", text: response.respuesta };
                setMessages((prev) => {
                    const updatedMessages = [...prev, botResponse];
                    return updatedMessages.length > 50 ? updatedMessages.slice(-50) : updatedMessages; // Limitar mensajes a 50
                });
            } else {
                setMessages((prev) => [...prev, { sender: "bot", text: "Hubo un problema al procesar tu consulta." }]);
            }
        } catch (error) {
            setMessages((prev) => [...prev, { sender: "bot", text: "No se pudo conectar con el servidor." }]);
        }

        setInput(""); // Limpiar el campo de entrada
        setIsProcessing(false); // Liberar bloqueo
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage(); // Enviar mensaje al presionar Enter
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chatbot-fullscreen">
            {/* Header */}
            <div className="chatbot-header">
                Banco de Loja - Asistente Virtual
            </div>

            {/* Chatbox */}
            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === "bot" ? "bot-message" : "user-message"}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="chatbot-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown} // Detectar tecla presionada
                    placeholder="Escribe un mensaje..."
                    className="input-field"
                    disabled={isProcessing} // Bloquear entrada mientras procesa
                />
                <button onClick={sendMessage} className="send-button" disabled={isProcessing}>
                    {isProcessing ? "Enviando..." : "Enviar"}
                </button>
            </div>
        </div>
    );
}
