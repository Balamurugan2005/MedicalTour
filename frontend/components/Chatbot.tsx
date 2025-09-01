'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your medical tourism assistant ✨. I can help you with information about medical procedures, destinations, costs, and more. How can I assist you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Optimized response generation with better error handling
  const generateResponse = async (userMessage: string) => {
    const websiteContext = `You are an AI assistant for "Explore Medical Tourism Worldwide". 

Available Countries: Colombia 🇨🇴, Mexico 🇲🇽, Turkey 🇹🇷, India 🇮🇳, South Korea 🇰🇷, Vietnam 🇻🇳

Procedures: Cosmetic (Botox, Fillers, Laser), Dental (Cleaning, Crown, Implant), Imaging (MRI, CT, X-Ray)

Features: Cost comparison tool, Interactive world map, Real-time calculations

Savings: Up to 80% vs US prices. Additional costs: Flight ($200-$1000), Hotel ($50-$200/night), Visa ($20-$120), Insurance ($50-$250)

Keep responses short and helpful.`;

    const prompt = `${websiteContext}\n\nUser: ${userMessage}`;

    const apiKey = 'AIzaSyDd9f46dZXVvMbSfqQJATv4lT8z8RlUdP8';
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // Reduced timeout

      console.log('Sending request to Gemini API...');
      
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150, // Reduced token limit
        },
      };
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);

      let botResponse = '';
      
      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          botResponse = candidate.content.parts[0].text || '';
        }
      } else if (data.promptFeedback) {
        throw new Error('Prompt blocked by safety filters');
      } else if (data.error) {
        throw new Error(data.error.message || 'API Error');
      }

      if (!botResponse) {
        throw new Error('No response received from API');
      }

      return botResponse;
      
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      if (error.name === 'AbortError') {
        return 'I\'m taking a bit longer than usual. Please try again in a moment.';
      }
      
      if (error.message.includes('API Error: 400')) {
        return 'I\'m having trouble understanding your request. Please try rephrasing your question.';
      }
      
      if (error.message.includes('API Error: 403')) {
        return 'I\'m having trouble accessing my knowledge base right now. Please try again later.';
      }
      
      if (error.message.includes('API Error: 429')) {
        return 'I\'m receiving too many requests right now. Please wait a moment and try again.';
      }
      
      // Fallback responses for common questions
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return 'Hello! Welcome to Explore Medical Tourism Worldwide. How can I help you with our cost comparison tool or destination selection?';
      }
      
      if (lowerMessage.includes('how are you') || lowerMessage.includes('how r u')) {
        return 'I\'m ready to help you explore medical tourism options! What procedure or destination are you interested in?';
      }
      
      if (lowerMessage.includes('dental') && lowerMessage.includes('mexico')) {
        return 'Great choice! Mexico offers excellent dental care at 60-80% savings. Use our cost comparison tool to see specific prices for procedures like dental cleaning, crowns, or implants.';
      }
      
      if (lowerMessage.includes('currency') || lowerMessage.includes('dollar') || lowerMessage.includes('rupee')) {
        return 'I can\'t provide live currency rates, but I can help you compare medical procedure costs between countries using our platform!';
      }
      
      return 'I apologize, but I\'m experiencing technical difficulties. Please try asking about our medical tourism services, procedures, or destinations.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const botResponse = await generateResponse(userMessage.text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // Quick response suggestions
  const quickResponses = [
    "What procedures are available on this website?",
    "Which countries can I compare costs with?",
    "How much can I save with medical tourism?",
    "How does the cost comparison tool work?"
  ];

  const handleQuickResponse = (response: string) => {
    setInputValue(response);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-4 sm:right-4">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] max-w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col animate-slideIn sm:w-80">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-3 sm:p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative">
                <div className="text-2xl sm:text-3xl animate-pulse">✨</div>
                <div className="absolute -top-1 -right-1 text-xs animate-bounce">💫</div>
                <div className="absolute -bottom-1 -left-1 text-xs animate-ping">⭐</div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-base sm:text-lg truncate">Medical Tourism Assistant</h3>
                <p className="text-xs opacity-90 truncate">Ask me about our platform & services</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20 flex-shrink-0"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-sm ${
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words">{message.text}</p>
                  <p className={`text-xs mt-1 sm:mt-2 ${message.isUser ? 'text-blue-100' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md px-3 py-2 sm:px-4 sm:py-3 border border-gray-100 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Responses */}
          {messages.length === 1 && (
            <div className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-600 mb-2 font-medium">Quick questions:</p>
              <div className="flex flex-wrap gap-1">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(response)}
                    className="text-xs bg-white border border-gray-200 rounded-full px-2 py-1 sm:px-3 hover:bg-blue-50 hover:border-blue-300 transition-colors break-words"
                  >
                    {response}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our medical tourism platform..."
                className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex-shrink-0"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Floating Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center animate-float"
      >
        {/* Glitter effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 opacity-0 hover:opacity-20 transition-opacity duration-300 animate-pulse"></div>
        
        {/* Main logo with enhanced glitter */}
        <div className="relative z-10">
          {isOpen ? (
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative">
              <div className="text-2xl sm:text-3xl animate-pulse">✨</div>
              <div className="absolute -top-1 -right-1 text-xs sm:text-sm animate-bounce"></div>
              <div className="absolute -bottom-1 -left-1 text-xs sm:text-sm animate-ping"></div>
              <div className="absolute top-0 left-0 text-xs animate-spin" style={{ animationDuration: '3s' }}></div>
            </div>
          )}
        </div>

        {/* Pulse ring effect */}
        <div className="absolute inset-0 rounded-full border-2 border-white opacity-30 animate-ping"></div>
      </button>
    </div>
  );
};

export default Chatbot;
