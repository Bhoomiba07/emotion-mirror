import { useEffect, useRef, useState } from 'react';

function ConversationPanel({ messages, currentParticipantId, onSend, disabled }) {
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSubmit(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || disabled || sending) return;

    setSending(true);
    setSendError('');
    try {
      await onSend(text);
      setDraft('');
    } catch (error) {
      setSendError(error.message || 'Unable to send message.');
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="live-panel live-panel--conversation" aria-label="Conversation">
      <div className="live-panel__header">
        <h2>Conversation</h2>
      </div>

      <div className="conversation-feed" role="log" aria-live="polite" aria-relevant="additions">
        {messages.length === 0 ? (
          <p className="conversation-empty">No messages yet. Start the conversation.</p>
        ) : (
          messages.map((message) => {
            const isSelf = message.senderId === currentParticipantId;
            return (
              <article
                key={message.id}
                className={`conversation-message ${isSelf ? 'conversation-message--self' : ''}`}
              >
                <p className="conversation-message__sender">{message.senderName}</p>
                <p className="conversation-message__text">{message.text}</p>
              </article>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <form className="conversation-compose" onSubmit={handleSubmit}>
        <label htmlFor="live-message-input" className="visually-hidden">
          Type a message
        </label>
        <input
          id="live-message-input"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message..."
          disabled={disabled || sending}
          autoComplete="off"
        />
        <button type="submit" className="btn btn-primary" disabled={disabled || sending || !draft.trim()}>
          Send
        </button>
      </form>
      {sendError ? <p className="form-error">{sendError}</p> : null}
    </section>
  );
}

export default ConversationPanel;
