import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  X, 
  Send, 
  Mic, 
  Camera, 
  Paperclip,
  Bot,
  Leaf,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const quickReplies = [
  "Analyze my crop health",
  "Weather forecast today",
  "Best time to plant rice?",
  "Check market prices",
];

const initialMessages: Message[] = [
  {
    id: "1",
    type: "bot",
    content: "Hello! I'm your AgriSmart AI assistant. How can I help you today? You can ask me about pest detection, weather, market prices, or upload images for crop analysis.",
    timestamp: new Date(),
  },
];

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("weather")) {
      return "Today's forecast: Sunny with temperatures around 28°C. Light winds from the east. Good conditions for fieldwork! Would you like a 7-day forecast?";
    }
    if (lowerQuery.includes("price") || lowerQuery.includes("market")) {
      return "Current market prices:\n• Rice: $420/ton (+2.3%)\n• Wheat: $285/ton (-0.5%)\n• Corn: $195/ton (+1.8%)\n\nWould you like to set up price alerts?";
    }
    if (lowerQuery.includes("pest") || lowerQuery.includes("disease")) {
      return "To analyze for pests or diseases, please upload a clear photo of the affected plant. I can identify over 50 common crop diseases with 95% accuracy.";
    }
    if (lowerQuery.includes("plant") || lowerQuery.includes("rice")) {
      return "For rice cultivation in your region, the optimal planting window is mid-June to early July. Current soil moisture levels look good at 67%. Shall I create a planting schedule?";
    }
    return "I understand you're asking about farming. Could you please be more specific? I can help with:\n• Pest/disease detection\n• Weather forecasts\n• Market prices\n• Crop planning\n• Soil health analysis";
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
  };

  return (
    <>
      {/* Chat Widget Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors",
          isOpen 
            ? "bg-secondary text-secondary-foreground" 
            : "bg-gradient-primary text-primary-foreground shadow-glow"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageSquare className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-harvest opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-harvest"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-primary p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary-foreground">AgriSmart AI</h3>
                <p className="text-xs text-primary-foreground/70">Always here to help</p>
              </div>
              <div className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex",
                      message.type === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                        message.type === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      )}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-muted px-4 py-3">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Replies */}
            <div className="border-t border-border bg-muted/30 p-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="rounded-full bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Camera className="h-4 w-4" />
                </Button>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={handleSend} 
                  disabled={!input.trim()}
                  size="icon"
                  className="shrink-0 bg-gradient-primary"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};