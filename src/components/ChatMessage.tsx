import './ChatMessage.css'

interface ChatMessageProps {
  author: string
  message: string
  writing?: boolean
}

export function ChatMessage({ author, message, writing }: ChatMessageProps) {
  return (
    <div className="chat-message">
      <span className="chat-message-author">{author}</span>
      <span className={`chat-message-content ${writing ? 'chat-message-content--writing' : ''}`}>{message}</span>
    </div>
  )
}
