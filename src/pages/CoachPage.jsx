import { useState, useRef, useEffect } from 'react';
import { COACH_SYSTEM_PROMPT } from '../data/coachPrompt';
import {
  getApiKey,
  saveApiKey,
  clearApiKey,
  saveCoachSession,
  getCoachSessions,
  getCoachSession,
} from '../data/storage';
import { getTodayState } from '../data/storage';
import { STATES } from '../data/practices';

export default function CoachPage({ initialPrompt }) {
  const [apiKey, setApiKey] = useState(() => getApiKey());
  const [keyInput, setKeyInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [pastSessions, setPastSessions] = useState([]);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const hasInitialized = useRef(false);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle initial prompt from Nature tab
  useEffect(() => {
    if (initialPrompt && apiKey && !hasInitialized.current) {
      hasInitialized.current = true;
      const todayState = getTodayState();
      const stateLabel = todayState
        ? STATES.find((s) => s.id === todayState)?.label
        : null;
      const contextMessage = stateLabel
        ? `Today's nature prompt was: "${initialPrompt}"\n\nI checked in as: ${stateLabel}`
        : `Today's nature prompt was: "${initialPrompt}"`;

      sendMessage(contextMessage);
    }
  }, [initialPrompt, apiKey]);

  const sendMessage = async (text) => {
    if (!text.trim() || !apiKey) return;

    const userMessage = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          system: COACH_SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.content[0].text,
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);

      // Save session
      const session = {
        id: sessionId || undefined,
        messages: updatedMessages,
        state: getTodayState(),
      };
      const saved = saveCoachSession(session);
      if (!sessionId) setSessionId(saved.id);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `I couldn't connect right now. ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSaveKey = () => {
    if (keyInput.trim()) {
      saveApiKey(keyInput.trim());
      setApiKey(keyInput.trim());
      setKeyInput('');
    }
  };

  const handleClearKey = () => {
    clearApiKey();
    setApiKey(null);
  };

  const startNewSession = () => {
    setMessages([]);
    setSessionId(null);
    hasInitialized.current = false;
    setShowHistory(false);
  };

  const loadSession = (id) => {
    const session = getCoachSession(id);
    if (session) {
      setMessages(session.messages || []);
      setSessionId(session.id);
      setShowHistory(false);
    }
  };

  const toggleHistory = () => {
    if (!showHistory) {
      setPastSessions(getCoachSessions());
    }
    setShowHistory(!showHistory);
  };

  // API key setup screen
  if (!apiKey) {
    return (
      <div className="px-5 pt-7 pb-24">
        <div className="mb-5">
          <h1 className="font-display text-[28px] font-light tracking-wide text-text mb-1">
            Coach
          </h1>
          <p className="font-display text-sm italic text-text-faint font-light">
            a practice companion
          </p>
        </div>

        <div className="bg-surface border border-border rounded-[14px] p-5 backdrop-blur-sm">
          <p className="font-body text-[13px] text-text-muted leading-relaxed mb-4">
            The coach uses the Anthropic API to have reflective conversations
            about your practice. It's not a therapist — it's a wise friend
            who has also sat on the cushion.
          </p>
          <p className="font-body text-[13px] text-text-muted leading-relaxed mb-4">
            To get started, enter your Anthropic API key. It's stored only
            in your browser's local storage and sent directly to Anthropic's
            servers — never to any third party.
          </p>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="sk-ant-..."
            className="w-full px-4 py-3 rounded-xl font-body text-sm text-text bg-bg border border-border mb-3 outline-none focus:border-sage transition-colors"
          />
          <button
            onClick={handleSaveKey}
            className="w-full px-6 py-3.5 rounded-full font-body text-sm font-medium text-bg tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #6B8F71, #5A7D60)',
            }}
          >
            Save & Begin
          </button>
        </div>
      </div>
    );
  }

  // History view
  if (showHistory) {
    return (
      <div className="px-5 pt-7 pb-24">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="font-display text-[28px] font-light tracking-wide text-text mb-1">
              Past Sessions
            </h1>
          </div>
          <button
            onClick={() => setShowHistory(false)}
            className="font-body text-xs text-sage-dark px-3 py-1.5 rounded-full"
            style={{ border: '1px solid rgba(107,143,113,0.2)' }}
          >
            Back
          </button>
        </div>

        {pastSessions.length === 0 ? (
          <div className="bg-surface border border-border rounded-[14px] p-5 text-center backdrop-blur-sm">
            <p className="font-body text-sm text-text-faint italic">
              No sessions yet. Start a conversation.
            </p>
          </div>
        ) : (
          pastSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => loadSession(session.id)}
              className="w-full text-left bg-surface border border-border rounded-[14px] p-4 mb-3 backdrop-blur-sm transition-all hover:bg-surface-active"
            >
              <div className="font-body text-xs text-text-hint mb-1">
                {new Date(session.date).toLocaleDateString('en-AU', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                })}
              </div>
              <p className="font-body text-[13px] text-text-muted line-clamp-2">
                {session.messages?.[0]?.content || 'Empty session'}
              </p>
            </button>
          ))
        )}

        <button
          onClick={startNewSession}
          className="w-full mt-4 px-6 py-3.5 rounded-full font-body text-sm font-medium text-bg tracking-wide"
          style={{
            background: 'linear-gradient(135deg, #6B8F71, #5A7D60)',
          }}
        >
          New Conversation
        </button>
      </div>
    );
  }

  // Main chat view
  return (
    <div className="flex flex-col h-[calc(100vh-52px)]">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-light tracking-wide text-text">
            Coach
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggleHistory}
            className="font-body text-[11px] text-text-hint px-3 py-1.5 rounded-full"
            style={{ border: '1px solid rgba(139,125,107,0.15)' }}
          >
            History
          </button>
          <button
            onClick={startNewSession}
            className="font-body text-[11px] text-sage-dark px-3 py-1.5 rounded-full"
            style={{ border: '1px solid rgba(107,143,113,0.2)' }}
          >
            New
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="font-display text-lg text-text-faint italic font-light mb-2">
              What's arising?
            </p>
            <p className="font-body text-xs text-text-hint">
              Share what's on your mind. I'm here.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 ${msg.role === 'user' ? 'flex justify-end' : ''}`}
          >
            <div
              className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                msg.role === 'user'
                  ? 'rounded-br-md'
                  : 'rounded-bl-md'
              }`}
              style={{
                background:
                  msg.role === 'user'
                    ? 'rgba(107,143,113,0.1)'
                    : 'rgba(255,255,255,0.7)',
                border:
                  msg.role === 'user'
                    ? '1px solid rgba(107,143,113,0.15)'
                    : '1px solid rgba(139,125,107,0.1)',
              }}
            >
              <p className="font-body text-[13px] text-text leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="mb-4">
            <div
              className="rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] inline-block"
              style={{
                background: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(139,125,107,0.1)',
              }}
            >
              <div className="flex gap-1.5 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-text-hint animate-pulse" />
                <div
                  className="w-1.5 h-1.5 rounded-full bg-text-hint animate-pulse"
                  style={{ animationDelay: '0.3s' }}
                />
                <div
                  className="w-1.5 h-1.5 rounded-full bg-text-hint animate-pulse"
                  style={{ animationDelay: '0.6s' }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-5 pb-6 pt-2">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What's arising?"
            rows={1}
            className="flex-1 px-4 py-3 rounded-2xl font-body text-sm text-text bg-surface border border-border resize-none outline-none focus:border-sage transition-colors"
            style={{ maxHeight: 120 }}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="self-end px-4 py-3 rounded-full font-body text-sm text-bg transition-opacity"
            style={{
              background: 'linear-gradient(135deg, #6B8F71, #5A7D60)',
              opacity: !input.trim() || loading ? 0.5 : 1,
            }}
          >
            ↑
          </button>
        </form>
        <div className="flex justify-between items-center mt-2">
          <p className="font-body text-[10px] text-text-hint italic">
            Not a therapist. A practice companion.
          </p>
          <button
            onClick={handleClearKey}
            className="font-body text-[10px] text-text-hint underline"
          >
            Clear API key
          </button>
        </div>
      </div>
    </div>
  );
}
