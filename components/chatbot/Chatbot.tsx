import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import ChatIcon from './ChatIcon';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initializeChat = () => {
    if (process.env.API_KEY) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: "Eres un asistente amigable y servicial en el sitio web del portafolio de un desarrollador web. Tu objetivo es responder preguntas sobre el desarrollador, sus proyectos y cómo contactarlo. Sé conciso, profesional y amigable.",
                },
            });
            setMessages([{ role: 'bot', text: '¡Hola! ¿Cómo puedo ayudarte a conocer más sobre este portafolio?' }]);
        } catch (error) {
            console.error("Error initializing Gemini:", error);
            setMessages([{ role: 'bot', text: 'Lo siento, no puedo conectarme con el asistente en este momento.' }]);
        }
    } else {
         setMessages([{ role: 'bot', text: 'La clave de API no está configurada.' }]);
    }
  };
  
  useEffect(() => {
    if(isOpen && !chatRef.current){
        initializeChat();
    }
  }, [isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseStream = await chatRef.current.sendMessageStream({ message: input });
      
      let botResponse = '';
      setMessages(prev => [...prev, { role: 'bot', text: '' }]);

      for await (const chunk of responseStream) {
          botResponse += chunk.text;
          setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1].text = botResponse;
              return newMessages;
          });
      }

    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      setMessages(prev => [...prev, { role: 'bot', text: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-lime-600 text-white p-4 rounded-full shadow-lg hover:bg-lime-700 transition-colors z-50"
        aria-label="Abrir chatbot"
      >
        <ChatIcon />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50">
          <header className="bg-lime-600 text-white p-3 rounded-t-lg">
            <h3 className="font-bold text-center">Asistente Virtual</h3>
          </header>

          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded-lg max-w-[80%] chatbot-message ${msg.role === 'user' ? 'user' : 'bot'}`}>
                {msg.text || <span className="animate-pulse">...</span>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                disabled={isLoading}
              />
              <button type="submit" className="bg-lime-600 text-white px-4 rounded-md hover:bg-lime-700 disabled:bg-lime-300" disabled={isLoading}>
                Enviar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;