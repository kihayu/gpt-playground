import React, { useEffect } from 'react'
import { TextField } from './components/TextField'
import { RadioGroup } from './components/RadioGroup'
import { Radio } from 'react-aria-components'
import { TextArea } from './components/TextArea'
import { Button } from './components/Button'
import { ChatMessage } from './ChatMessage'
import './App.css'

function App() {
  const [systemInput, setSystemInput] = React.useState('')
  const [userInput, setUserInput] = React.useState('')
  const [maxLengthValue, setMaxLengthValue] = React.useState('Lang')
  const [randomnessValue, setRandomnessValue] = React.useState('normal')
  const [username, setUsername] = React.useState('')
  const [assistantName, setAssistantName] = React.useState('')

  const appMessagesRef = React.useRef<HTMLDivElement>(null)

  const outputLengthRadios = [
    { label: 'Kurz', value: 200 },
    { label: 'Lang', value: 1280 },
  ].map((element) => (
    <Radio key={element.value} value={element.label}>
      {element.label}
    </Radio>
  ))

  const randomnessRadios = [
    { label: 'Sehr statisch', value: 'very-static' },
    { label: 'Statisch', value: 'static' },
    { label: 'Normal', value: 'normal' },
    { label: 'Zufällig', value: 'random' },
    { label: 'Sehr Zufällig', value: 'very-random' },
  ].map((element) => (
    <Radio key={element.value} value={element.value}>
      {element.label}
    </Radio>
  ))

  const [messages, setMessages] = React.useState([] as Array<{ role: string; content: string }>)

  const handleUserInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage()
    }
  }

  const transformMaxLengthValue = (maxLengthValue: string): number => {
    if (maxLengthValue === 'Kurz') {
      return 150
    } else if (maxLengthValue === 'Lang') {
      return 1200
    } else {
      return 0
    }
  }

  const transformTemperature = (randomnessValue: string): number => {
    if (randomnessValue === 'very-static') {
      return 0.3
    } else if (randomnessValue === 'static') {
      return 0.6
    } else if (randomnessValue === 'normal') {
      return 0.8
    } else if (randomnessValue === 'random') {
      return 1.0
    } else if (randomnessValue === 'very-random') {
      return 1.5
    } else {
      return 0.7
    }
  }

  const sendMessage = async () => {
    let tempMessages = []
    const userMessageObject = { role: 'user', content: userInput }

    if (messages.length === 0) {
      tempMessages = [
        { role: 'system', content: systemInput || 'Du bist ein hilfreicher Assistent.' },
        userMessageObject,
      ]
    } else {
      tempMessages = [...messages, userMessageObject]
    }
    setUserInput('')
    setMessages(tempMessages)

    const response = await fetch('http://localhost:3000/gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: tempMessages,
        model: 'gpt-3.5-turbo',
        maxTokens: transformMaxLengthValue(maxLengthValue),
        temperature: transformTemperature(randomnessValue),
      }),
    })

    const responseData = await response.json()
    setMessages([...tempMessages, responseData])
  }

  const displayAuthor = (role: string) => {
    if (role === 'user') {
      return username || 'Du'
    } else if (role === 'assistant') {
      return assistantName || 'ChatGPT'
    }
    return role
  }

  useEffect(() => {
    if (appMessagesRef.current) {
      appMessagesRef.current.scrollTop = appMessagesRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="app">
      <div className="app-system">
        <TextField label="Dein Name" value={username} onChange={setUsername} placeholder="Du" />
        <TextField label="Assistent Name" value={assistantName} onChange={setAssistantName} placeholder="ChatGPT" />
        <TextArea
          onChange={setSystemInput}
          value={systemInput}
          placeholder="Du bist ein hilfreicher Assistent."
          className="react-aria-TextField app-system-input-wrapper"
          inputClassName="react-aria-TextArea app-system-input"
          label="System"
        />
      </div>
      <div className="app-chat">
        <div className="app-messages" ref={appMessagesRef}>
          {messages.map(
            (messageObject) =>
              messageObject.role !== 'system' && (
                <ChatMessage
                  key={messageObject.content}
                  author={displayAuthor(messageObject.role)}
                  message={messageObject.content}
                />
              ),
          )}
        </div>
        <div className="app-user-message">
          <TextField
            className="react-aria-TextField app-user-message-input-wrapper"
            inputClassName="react-aria-Input app-user-message-input"
            label="Eingabe"
            value={userInput}
            onChange={setUserInput}
            onKeyDown={handleUserInputKeyDown}
          />
          <Button className="react-aria-Button app-user-message-button" onPressUp={sendMessage}>
            Senden
          </Button>
        </div>
      </div>
      <div className="app-settings">
        <RadioGroup inline label="Maximale Länge" value={maxLengthValue} onChange={setMaxLengthValue}>
          {outputLengthRadios}
        </RadioGroup>
        <RadioGroup label="Randomness" value={randomnessValue} onChange={setRandomnessValue}>
          {randomnessRadios}
        </RadioGroup>
      </div>
    </div>
  )
}

export default App
