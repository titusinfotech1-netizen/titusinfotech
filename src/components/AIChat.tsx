import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Sparkles, User, Bot, Loader2, ArrowRight } from 'lucide-react';

interface Message {
 id: string;
 sender: 'user' | 'bot';
 text: string;
 time: string;
}

export default function AIChat() {
 const [isOpen, setIsOpen] = useState(false);
 const [messages, setMessages] = useState<Message[]>([
 {
 id: "init-1",
 sender: "bot",
 text: "Greetings. I am **Titus**, your premium digital consultant. I can help you explore our award-winning web design services, review our 7-step process, estimate budgets, or schedule a priority booking.\n\nWhat elegant solution are you looking to create today?",
 time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
 }
 ]);
 const [input, setInput] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const messagesEndRef = useRef<HTMLDivElement>(null);

 const suggestions = [
 "Explain your 7-step process",
 "What is the average cost?",
 "Do you build with React/Next.js?",
 "How do we request a quote?"
 ];

 useEffect(() => {
 messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
 }, [messages, isOpen]);

 const handleSend = async (textToSend: string) => {
 if (!textToSend.trim()) return;

 const userMsg: Message = {
 id: `msg-${Date.now()}`,
 sender: 'user',
 text: textToSend,
 time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
 };

 setMessages(prev => [...prev, userMsg]);
 setInput("");
 setIsLoading(true);

 try {
 const response = await fetch('/api/chat', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ message: textToSend })
 });

 if (!response.ok) {
 throw new Error("Network response was not ok");
 }

 const data = await response.json();
 
 const botMsg: Message = {
 id: `msg-${Date.now() + 1}`,
 sender: 'bot',
 text: data.text || "I apologize, but I received an empty response. Let's try once more.",
 time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
 };
 
 setMessages(prev => [...prev, botMsg]);
 } catch (error) {
 console.error("AI Error:", error);
 const errorMsg: Message = {
 id: `msg-${Date.now() + 1}`,
 sender: 'bot',
 text: "I apologize, but my core neural link is currently fluctuating. Our technical team is checking the configuration. Feel free to use our primary contact form below for priority response!",
 time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
 };
 setMessages(prev => [...prev, errorMsg]);
 } finally {
 setIsLoading(false);
 }
 };

 const parseMarkdown = (text: string) => {
 // Simple markdown helper for bold and line breaks to render premium typographic responses
 return text.split('\n').map((line, lineIdx) => {
 let parts = [];
 let currentString = line;
 let boldRegex = /\*\*(.*?)\*\*/g;
 let match;
 let lastIndex = 0;

 while ((match = boldRegex.exec(line)) !== null) {
 if (match.index > lastIndex) {
 parts.push(line.substring(lastIndex, match.index));
 }
 parts.push(<strong key={match.index} className="text-[#D4AF37] font-semibold">{match[1]}</strong>);
 lastIndex = boldRegex.lastIndex;
 }
 
 if (lastIndex < line.length) {
 parts.push(line.substring(lastIndex));
 }

 return (
 <p key={lineIdx} className={line.trim() === "" ? "h-3" : "mb-2 leading-relaxed"}>
 {parts.length > 0 ? parts : line}
 </p>
 );
 });
 };

 return (
 <>
 {/* Floating Button */}
 <button
 onClick={() => setIsOpen(true)}
 className="fixed bottom-6 right-6 z-40 bg-white hover:bg-[#D4AF37] text-[#D4AF37] border-gray-200 hover:text-white p-4 rounded-full shadow-2xl transition-all duration-300 group border border-solid border-white/10 hover:border-[#D4AF37]/50 active:scale-95 flex items-center gap-2 hover:text-[#D4AF37] cursor-pointer"
 id="ai-assistant-btn"
 aria-label="Ask Titus AI"
 >
 <Sparkles className="w-5 h-5 animate-pulse text-[#D4AF37] group-hover:text-[#D4AF37]" />
 <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-medium text-xs font-playfair">
 Consult Titus AI
 </span>
 </button>

 {/* Floating Chat Container */}
 {isOpen && (
 <div 
 className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[550px] bg-white rounded-2xl shadow-2xl border border-solid border-gray-100 flex flex-col z-50 overflow-hidden animate-fade-in-up font-playfair"
 id="ai-chat-window"
 >
 {/* Header */}
 <div className="bg-white p-4 flex items-center justify-between border-b border-solid border-[#D4AF37]/20">
 <div className="flex items-center gap-3">
 <div className="bg-[#D4AF37]/10 p-2 rounded-full border border-solid border-[#D4AF37]/30">
 <Sparkles className="w-5 h-5 text-[#D4AF37]" />
 </div>
 <div>
 <h3 className="font-playfair font-semibold text-[#B89B5E] text-sm flex items-center gap-1.5">
 Titus <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full uppercase tracking-wider">AI Ambassador</span>
 </h3>
 <p className="text-[11px] text-black">Under 1s average response time</p>
 </div>
 </div>
 <button 
 onClick={() => setIsOpen(false)}
 className="text-black hover:text-white transition-colors duration-150 p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
 aria-label="Close Chat"
 >
 <X className="w-4 h-4" />
 </button>
 </div>

 {/* Messages Body */}
 <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDFCF9] ">
 {messages.map((msg) => (
 <div
 key={msg.id}
 className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
 >
 {/* Avatar */}
 <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs border border-solid ${
 msg.sender === 'user' 
 ? 'bg-white text-[#D4AF37] border-gray-200' 
 : 'bg-white text-[#D4AF37] border-[#D4AF37]/30'
 }`}>
 {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-[#D4AF37]" />}
 </div>

 {/* Content Bubble */}
 <div className="space-y-1">
 <div className={`p-3 rounded-2xl text-xs ${
 msg.sender === 'user'
 ? 'bg-white text-[#D4AF37] border border-solid border-gray-200 rounded-tr-none'
 : 'bg-white text-[#B89B5E] border border-solid border-gray-100 shadow-sm rounded-tl-none'
 }`}>
 {msg.sender === 'user' ? msg.text : parseMarkdown(msg.text)}
 </div>
 <p className={`text-[9px] text-black font-medium px-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
 {msg.time}
 </p>
 </div>
 </div>
 ))}

 {isLoading && (
 <div className="flex gap-2.5 max-w-[85%]">
 <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-solid border-[#D4AF37]/30 shrink-0 text-xs">
 <Loader2 className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
 </div>
 <div className="bg-white border border-solid border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm text-xs text-black italic flex items-center gap-1.5">
 Titus is articulating a response...
 </div>
 </div>
 )}
 <div ref={messagesEndRef} />
 </div>

 {/* Quick Suggestions (Only when not loading) */}
 {messages.length === 1 && (
 <div className="px-4 py-2 bg-[#FDFCF9] border-t border-solid border-gray-50 ">
 <p className="text-[10px] font-semibold uppercase tracking-wider text-black mb-2 font-playfair">Suggested Consultations</p>
 <div className="flex flex-wrap gap-1.5">
 {suggestions.map((s, idx) => (
 <button
 key={idx}
 onClick={() => handleSend(s)}
 className="text-[10px] bg-white hover:bg-white hover:text-[#D4AF37] border border-solid border-gray-100 rounded-full px-2.5 py-1 text-gray-600 cursor-pointer transition-all duration-200 active:scale-95 flex items-center gap-1 shrink-0"
 >
 {s} <ArrowRight className="w-2.5 h-2.5 text-[#D4AF37]" />
 </button>
 ))}
 </div>
 </div>
 )}

 {/* Input Panel */}
 <form 
 onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
 className="p-3 bg-white border-t border-solid border-gray-100 flex gap-2 items-center"
 >
 <input
 type="text"
 value={input}
 onChange={(e) => setInput(e.target.value)}
 disabled={isLoading}
 placeholder="Inquire about processes, budgeting, or frameworks..."
 className="flex-1 bg-gray-50 border border-solid border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-black text-ellipsis"
 />
 <button
 type="submit"
 disabled={isLoading || !input.trim()}
 className="bg-[#D4AF37] hover:bg-[#B89B5E] text-[#D4AF37] disabled:bg-gray-100 disabled:text-gray-300 p-2 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center"
 aria-label="Send message"
 >
 <Send className="w-3.5 h-3.5" />
 </button>
 </form>
 </div>
 )}
 </>
 );
}
