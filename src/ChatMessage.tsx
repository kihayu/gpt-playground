import './ChatMessage.css'

interface ChatMessageProps {
  author: string
  message: string
}

export function ChatMessage({ author, message }: ChatMessageProps) {
  return (
    <div className="chat-message">
      <span className="chat-message-author">{author}</span>
      <span className="chat-message-content">{message}</span>
    </div>
  )
}
