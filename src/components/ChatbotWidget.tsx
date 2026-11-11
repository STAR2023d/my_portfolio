import React, { useState, useRef, useEffect, useCallback } from "react";
import "./ChatbotWidget.css";
import { chatbotKnowledgeBase, chatbotResponses } from "../data/chatbotKB";

interface ChatMessage {
  type: "bot" | "user";
  text: string;
  suggestions?: string[];
}

interface ChatbotWidgetProps {
  initMessage?: string;
  position?: "right" | "left";
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  initMessage = "Hello! I'm your guide to Dan's work. Ask me about his projects, skills, or how to reach him.",
  position = "right",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: "bot", text: initMessage },
  ]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Send message
  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    // Add user message
    const userMsg: ChatMessage = { type: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Call the API (fallback to client-side matching if server not available)
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Remove typing indicator and add bot reply
      setMessages((prev) => {
        const withoutTyping = prev.filter((m) => !m.text.startsWith("typing"));
        return [...withoutTyping, { type: "bot", text: data.reply }];
      });

      if (data.suggestions && data.suggestions.length > 0) {
        setMessages((prev) => {
          const withoutTyping = prev.filter((m) => !m.text.startsWith("typing"));
          const withSuggestions = [
            ...withoutTyping,
            {
              type: "bot",
              text: "Suggested questions:",
              suggestions: data.suggestions,
            } as ChatMessage,
          ];
          return withSuggestions;
        });
      }
    } catch (err) {
      // Client-side fallback
      const reply = matchIntent(trimmed);
      setMessages((prev) => [...prev, { type: "bot", text: reply }]);
    } finally {
      setIsLoading(false);
      setShowSuggestions(false);
    }
  };

  // Client-side intent matching (fallback)
  const matchIntent = (text: string): string => {
    const lower = text.toLowerCase();
    const keywords = extractKeywords(text);

    const intentNames = Object.keys(chatbotKnowledgeBase.intents);
    for (const intentName of intentNames) {
      const intentData = chatbotKnowledgeBase.intents[intentName];
      if (!intentData) continue;
      let score = 0;

      for (const pattern of intentData.patterns) {
        if (lower.includes(pattern)) {
          score += 10;
        }
      }

      for (const keyword of intentData.keywords) {
        if (keywords.some((k) => k.includes(keyword))) {
          score += 5;
        }
      }

      if (score > 0) {
        return chatbotResponses[intentName].join("\n");
      }
    }

    return chatbotResponses.default.join("\n");
  };

  const extractKeywords = (text: string): string[] => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2);
  };

  // Quick questions
  const quickQuestions = chatbotKnowledgeBase.faqs.slice(0, 6);

  // Handle send
  const handleSend = () => {
    sendMessage(input);
  };

  // Toggle widget
  const toggleWidget = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        className="chatbot-toggle"
        onClick={toggleWidget}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>Close</span>
          </>
        ) : (
          <>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Chat</span>
          </>
        )}
      </button>

      {/* Chat widget */}
      <div
        className={`chatbot-widget ${isOpen ? "open" : ""} ${position === "left" ? "left" : ""}`}
      >
        {/* Header */}
        <div className="chatbot-header">
          <h4>Chat with me</h4>
          <button
            className="chatbot-header-close"
            onClick={toggleWidget}
            aria-label="Close chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chatbot-message chatbot-message-${msg.type}`}>
              {msg.type === "bot" && (
                <div className="chatbot-avatar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              )}
              <div className="chatbot-bubble">
                {msg.text.split("\n").map((line, li) => (
                  <div key={li}>{line}</div>
                ))}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="chatbot-suggestions">
                    {msg.suggestions.map((sug, si) => (
                      <button
                        key={si}
                        className="chatbot-suggestion-btn"
                        onClick={() => sendMessage(sug)}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {msg.type === "user" && (
                <div className="chatbot-avatar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="chatbot-message chatbot-message-bot">
              <div className="chatbot-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="chatbot-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messageEndRef} />
        </div>

        {/* Input area */}
        <div className="chatbot-input-area">
          <div className="chatbot-input-wrapper">
            <textarea
              ref={inputRef}
              className="chatbot-input"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              rows={1}
            />
            <button
              className="chatbot-send-btn"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <button
            className="chatbot-quick-btn"
            onClick={() => setShowSuggestions((prev) => !prev)}
            aria-label="Quick questions"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>Quick questions</span>
          </button>
        </div>

        {/* Quick suggestions dropdown */}
        {showSuggestions && (
          <div className="chatbot-suggestions-list">
            {quickQuestions.map((q) => (
              <button
                key={q}
                className="chatbot-suggestion-item"
                onClick={() => {
                  sendMessage(q);
                  setShowSuggestions(false);
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Press hint */}
      <div className="chatbot-hint">
        <kbd>Esc</kbd> close · <kbd>Ctrl</kbd> + <kbd>K</kbd> search
      </div>
    </>
  );
};

export default ChatbotWidget;
