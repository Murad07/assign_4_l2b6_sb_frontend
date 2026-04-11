"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Minus, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "model";
    text: string;
}

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "model", text: "Hello! I'm your SkillBridge Assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", text: userMessage }]);
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.map(m => ({
                        role: m.role,
                        parts: [{ text: m.text }]
                    }))
                }),
            });

            const data = await res.json();
            if (data.text) {
                setMessages(prev => [...prev, { role: "model", text: data.text }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "model", text: "I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className={cn(
                            "bg-background border shadow-2xl rounded-2xl overflow-hidden flex flex-col transition-all duration-300 mb-4",
                            isMinimized ? "h-14 w-64" : "h-[500px] w-[350px] md:w-[400px]"
                        )}
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex items-center justify-between text-primary-foreground">
                            <div className="flex items-center gap-2">
                                <Bot className="h-5 w-5" />
                                <span className="font-bold text-sm">SkillBridge Assistant</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/10 rounded transition-colors">
                                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded transition-colors">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5">
                                    {messages.map((msg, idx) => (
                                        <div key={idx} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                                            <div className={cn(
                                                "max-w-[85%] rounded-2xl p-3 text-sm shadow-sm",
                                                msg.role === "user"
                                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                                    : "bg-background border rounded-tl-none pr-4"
                                            )}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-background border rounded-2xl rounded-tl-none p-3 shadow-sm">
                                                <div className="flex gap-1">
                                                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Input */}
                                <div className="p-4 border-t bg-background">
                                    <form
                                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                        className="flex gap-2"
                                    >
                                        <Input
                                            placeholder="Ask me anything..."
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            className="rounded-full focus-visible:ring-primary"
                                        />
                                        <Button
                                            type="submit"
                                            size="icon"
                                            className="rounded-full shrink-0"
                                            disabled={isLoading || !input.trim()}
                                        >
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </form>
                                    <p className="text-[10px] text-center text-muted-foreground mt-2">
                                        Powered by SkillBridge AI
                                    </p>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Launch Button */}
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-all group"
                >
                    <MessageSquare className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ml-0 group-hover:ml-2 font-bold whitespace-nowrap">
                        Chat with Assistant
                    </span>
                </motion.button>
            )}
        </div>
    );
}
