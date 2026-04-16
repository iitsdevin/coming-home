import { useState, useRef, useEffect } from 'react';
import { COACH_SYSTEM_PROMPT } from '../data/coachPrompt';
import {
  getApiKey,
  saveApiKey,
  clearApiKey,
  saveCoachSession,
  getCoachSessions,
  getCoachSession,
  getTodayState,
} from '../data/storage';
import { STATES } from '../data/practices';

const OPENERS = [
  'Something\u00A0I\u2019m\u00A0sitting\u00A0with\u2026',
  'What\u00A0came\u00A0up\u00A0in\u00A0zazen',
  'A\u00A0pattern\u00A0I\u2019m\u00A0noticing',
  'I\u00A0need\u00A0to\u00A0slow\u00A0down',
];

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

  const todayState = getTodayState();
  const stateObj = todayState ? STATES.find((s) => s.id === todayState) : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt && apiKey && !hasInitialized.current) {
      hasInitialized.current = true;
      const contextMessage = stateObj
        ? `Today's nature prompt was: "${initialPrompt}"\n\nI checked in as: ${stateObj.label}`
        : `Today's nature prompt was: "${initialPrompt}"`;
      sendMessage(contextMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = { role: 'assistant', content: data.content[0].text };
      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);

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
        { role: 'assistant', content: `I couldn't connect right now. ${err.message}` },
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
    if (!showHistory) setPastSessions(getCoachSessions());
    setShowHistory(!showHistory);
  };

  // --- API key setup ---
  if (!apiKey) {
    return (
      <div className="px-6 pt-10">
        <div className="mb-8">
          <h1
            className="font-display font-light tracking-wide mb-1"
            style={{ fontSize: '30px', color: '#3D3830', lineHeight: 1.15 }}
          >
            Coach
          </h1>
          <p className="font-display italic font-light" style={{ fontSize: '15px', color: '#8B7D6B' }}>
            a practice companion
          </p>
        </div>

        <div
          className="rounded-[14px] p-6 backdrop-blur-sm"
          style={{
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(139,125,107,0.12)',
          }}
        >
          <p className="font-body leading-relaxed mb-4" style={{ fontSize: '13.5px', color: '#6B6050', lineHeight: 1.7 }}>
            The coach uses the Anthropic API to have reflective conversations
            about your practice. Not a therapist — a wise friend who has also
            sat on the cushion.
          </p>
          <p className="font-body leading-relaxed mb-5" style={{ fontSize: '13.5px', color: '#6B6050', lineHeight: 1.7 }}>
            Enter your Anthropic API key. It's stored only in your browser and
            sent directly to Anthropic's servers — never to any third party.
          </p>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="sk-ant-..."
            className="w-full px-4 py-3 rounded-xl font-body outline-none transition-colors mb-3"
            style={{
              fontSize: '14px',
              color: '#3D3830',
              background: '#F7F5F0',
              border: '1px solid rgba(139,125,107,0.15)',
            }}
          />
          <button
            onClick={handleSaveKey}
            className="w-full px-6 py-3.5 rounded-full font-body tracking-wide"
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#F7F5F0',
              background: 'linear-gradient(135deg, var(--season-accent), #5A7D60)',
            }}
          >
            Save & begin
          </button>
        </div>
      </div>
    );
  }

  // --- History view ---
  if (showHistory) {
    return (
      <div className="px-6 pt-10">
        <div className="flex items-center justify-between mb-6">
          <h1
            className="font-display font-light tracking-wide"
            style={{ fontSize: '26px', color: '#3D3830' }}
          >
            Past sessions
          </h1>
          <button
            onClick={() => setShowHistory(false)}
            className="font-body px-3 py-1.5 rounded-full"
            style={{
              fontSize: '11px',
              color: '#5A7D60',
              border: '1px solid rgba(107,143,113,0.2)',
            }}
          >
            Back
          </button>
        </div>

        {pastSessions.length === 0 ? (
          <div
            className="rounded-[14px] p-6 text-center backdrop-blur-sm"
            style={{
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(139,125,107,0.12)',
            }}
          >
            <p className="font-display italic font-light" style={{ fontSize: '14px', color: '#8B7D6B' }}>
              No sessions yet. Start a conversation.
            </p>
          </div>
        ) : (
          pastSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => loadSession(session.id)}
              className="w-full text-left rounded-[14px] p-4 mb-3 backdrop-blur-sm transition-all"
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(139,125,107,0.12)',
              }}
            >
              <div
                className="font-body mb-1"
                style={{ fontSize: '11px', color: '#A09080', letterSpacing: '0.1em' }}
              >
                {new Date(session.date).toLocaleDateString('en-AU', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                })}
              </div>
              <p className="font-body line-clamp-2" style={{ fontSize: '13px', color: '#6B6050' }}>
                {session.messages?.[0]?.content || 'Empty session'}
              </p>
            </button>
          ))
        )}

        <button
          onClick={startNewSession}
          className="w-full mt-4 px-6 py-3.5 rounded-full font-body tracking-wide"
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#F7F5F0',
            background: 'linear-gradient(135deg, var(--season-accent), #5A7D60)',
          }}
        >
          New conversation
        </button>
      </div>
    );
  }

  // --- Main chat view ---
  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100svh - 96px)' }}>
      {/* Header */}
      <div className="px-6 pt-8 pb-3 flex items-center justify-between">
        <div>
          <h1 className="font-display font-light tracking-wide" style={{ fontSize: '24px', color: '#3D3830' }}>
            Coach
          </h1>
          {stateObj && messages.length === 0 && (
            <p
              className="font-body mt-0.5"
              style={{ fontSize: '11px', color: '#A09080', letterSpacing: '0.08em' }}
            >
              arriving as · {stateObj.label.toLowerCase()}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggleHistory}
            className="font-body px-3 py-1.5 rounded-full"
            style={{
              fontSize: '10px',
              color: '#A09080',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border: '1px solid rgba(139,125,107,0.15)',
            }}
          >
            History
          </button>
          <button
            onClick={startNewSession}
            className="font-body px-3 py-1.5 rounded-full"
            style={{
              fontSize: '10px',
              color: '#5A7D60',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border: '1px solid rgba(107,143,113,0.2)',
            }}
          >
            New
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 pb-4">
        {messages.length === 0 && (
          <div className="py-10 text-center">
            <p
              className="font-display italic font-light mb-3"
              style={{ fontSize: '22px', color: '#6B6050', lineHeight: 1.4 }}
            >
              {stateObj ? 'What\u2019s here, arriving like this?' : 'What\u2019s arising?'}
            </p>
            <p
              className="font-body italic mb-8"
              style={{ fontSize: '12px', color: '#A09080', lineHeight: 1.7 }}
            >
              Speak plainly. No need to polish it.
            </p>

            {/* Opener chips — to break the blank-page freeze */}
            <div className="flex flex-wrap justify-center gap-2 px-2">
              {OPENERS.map((opener) => (
                <button
                  key={opener}
                  onClick={() => setInput(opener.replace(/\u00A0/g, ' ') + ' ')}
                  className="font-body px-3.5 py-2 rounded-full"
                  style={{
                    fontSize: '12px',
                    color: '#8B7D6B',
                    border: '1px solid rgba(139,125,107,0.15)',
                    background: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {opener.replace(/\u00A0/g, ' ')}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 ${msg.role === 'user' ? 'flex justify-end' : ''}`}
          >
            <div
              className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                msg.role === 'user' ? 'rounded-br-md' : 'rounded-bl-md'
              }`}
              style={{
                background:
                  msg.role === 'user'
                    ? 'rgba(107,143,113,0.10)'
                    : 'rgba(255,255,255,0.75)',
                border:
                  msg.role === 'user'
                    ? '1px solid rgba(107,143,113,0.18)'
                    : '1px solid rgba(139,125,107,0.10)',
              }}
            >
              <p
                className="font-body whitespace-pre-wrap"
                style={{ fontSize: '14px', color: '#3D3830', lineHeight: 1.65 }}
              >
                {msg.content}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="mb-4">
            <div
              className="rounded-2xl rounded-bl-md px-5 py-4 inline-block"
              style={{
                background: 'rgba(255,255,255,0.75)',
                border: '1px solid rgba(139,125,107,0.10)',
              }}
            >
              <div
                className="breathe-dot w-2 h-2 rounded-full"
                style={{ background: 'var(--season-accent)' }}
              />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className="px-6 pt-3 pb-4 sticky bottom-0"
        style={{
          background:
            'linear-gradient(to top, rgba(247,245,240,0.95) 60%, rgba(247,245,240,0))',
        }}
      >
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What's here?"
            rows={1}
            className="flex-1 px-4 py-3 rounded-2xl font-body resize-none outline-none transition-colors"
            style={{
              fontSize: '14px',
              color: '#3D3830',
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(139,125,107,0.15)',
              maxHeight: 120,
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 py-3 rounded-full font-body transition-opacity"
            style={{
              fontSize: '16px',
              color: '#F7F5F0',
              background: 'linear-gradient(135deg, var(--season-accent), #5A7D60)',
              opacity: !input.trim() || loading ? 0.4 : 1,
            }}
          >
            ↑
          </button>
        </form>
        <div className="flex justify-between items-center mt-2">
          <p className="font-body italic" style={{ fontSize: '10px', color: '#A09080' }}>
            Not a therapist. A practice companion.
          </p>
          <button
            onClick={handleClearKey}
            className="font-body underline"
            style={{ fontSize: '10px', color: '#A09080' }}
          >
            Clear key
          </button>
        </div>
      </div>
    </div>
  );
}
