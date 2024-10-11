import React, { useEffect } from 'react'
import { TextField } from './components/aria-components/TextField'
import { RadioGroup } from './components/aria-components/RadioGroup'
import { Radio } from 'react-aria-components'
import { TextArea } from './components/aria-components/TextArea'
import { Button } from './components/aria-components/Button'
import { ChatMessage } from './components/ChatMessage'
import './App.css'

function App() {
  const [systemInput, setSystemInput] = React.useState('')
  const [userInput, setUserInput] = React.useState('')
  const [maxLengthValue, setMaxLengthValue] = React.useState('Lang')
  const [randomnessValue, setRandomnessValue] = React.useState('normal')
  const [username, setUsername] = React.useState('')
  const [assistantName, setAssistantName] = React.useState('')
  const [inChat, setInChat] = React.useState(false)
  const [receiveMessage, setReceiveMessage] = React.useState(false)

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
    setInChat(true)
    setReceiveMessage(true)
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
        model: 'o1-mini',
        maxTokens: transformMaxLengthValue(maxLengthValue),
        temperature: transformTemperature(randomnessValue),
      }),
    })

    const responseData = await response.json()
    setMessages([...tempMessages, responseData])
    setReceiveMessage(false)
  }

  const reset = () => {
    setInChat(false)
    setMessages([])
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
        <TextField
          label="Dein Name (nur für Darstellung)"
          value={username}
          onChange={setUsername}
          placeholder="Du"
          isDisabled={inChat}
        />
        <TextField
          label="Assistent Name (nur für Darstellung)"
          value={assistantName}
          onChange={setAssistantName}
          placeholder="ChatGPT"
          isDisabled={inChat}
        />
        <TextArea
          onChange={setSystemInput}
          value={systemInput}
          placeholder="Du bist ein hilfreicher Assistent."
          className="react-aria-TextField app-system-input-wrapper"
          inputClassName="react-aria-TextArea app-system-input"
          label="System"
          isDisabled={inChat}
        />
        <Button className="react-aria-Button app-system-reset-button" onPressUp={reset} isDisabled={!inChat}>
          Chat neu starten
        </Button>
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
          {receiveMessage && (
            <ChatMessage author={displayAuthor(assistantName || 'ChatGPT')} message="Schreibt..." writing />
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
