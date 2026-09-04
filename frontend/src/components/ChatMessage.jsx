function ChatMessage({ role, senderLabel, text }) {
  const isAi = role === 'ai'

  return (
    <article
      className={isAi ? 'chat-row chat-row-ai' : 'chat-row chat-row-user'}
      aria-label={senderLabel}
    >
      <p className="chat-sender">{senderLabel}</p>
      <div
        className={isAi ? 'chat-bubble chat-bubble-ai' : 'chat-bubble chat-bubble-user'}
      >
        <p>{text}</p>
      </div>
    </article>
  )
}

export default ChatMessage
