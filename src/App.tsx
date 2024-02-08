import React from 'react'
import { TextField } from './components/TextField'
import { RadioGroup } from './components/RadioGroup'
import { Radio } from 'react-aria-components'
import { TextArea } from './components/TextArea'
import { Button } from './components/Button'
import './App.css'
import { ChatMessage } from './ChatMessage'

function App() {
  const [userInput, setUserInput] = React.useState('')
  const [sliderValue, setSliderValue] = React.useState('Lang')
  const [radioValue, setRadioValue] = React.useState('normal')

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

  const messages = [
    { author: 'System', message: 'How are you?' },
    { author: 'User', message: "I'm fine, thank you!" },
    { author: 'System', message: 'What are you up to?' },
    { author: 'User', message: 'Just working on some code.' },
    { author: 'System', message: 'Do you need any help?' },
    { author: 'User', message: "Yes, I'm having trouble with a function." },
    { author: 'System', message: 'Can you describe the problem?' },
    { author: 'User', message: "I'm getting an undefined error." },
    { author: 'System', message: 'Have you checked the variable declarations?' },
    { author: 'User', message: 'Let me check.' },
    { author: 'System', message: 'Take your time.' },
    { author: 'User', message: 'I found the issue, thanks!' },
    { author: 'System', message: "You're welcome! Anything else you need?" },
    { author: 'User', message: "No, that's all for now." },
    { author: 'System', message: 'Alright, happy coding!' },
  ]

  return (
    <div className="app">
      <div className="app-system">
        <TextArea
          className="react-aria-TextField app-system-input-wrapper"
          inputClassName="react-aria-TextArea app-system-input"
          label="System"
        />
      </div>
      <div className="app-chat">
        <div className="app-messages">
          {messages.map((messageObject) => (
            <ChatMessage key={messageObject.message} author={messageObject.author} message={messageObject.message} />
          ))}
        </div>
        <div className="app-user-message">
          <TextField
            className="react-aria-TextField app-user-message-input-wrapper"
            inputClassName="react-aria-Input app-user-message-input"
            label="Eingabe"
            value={userInput}
            onChange={setUserInput}
          />
          <Button className="react-aria-Button app-user-message-button">Senden</Button>
        </div>
      </div>
      <div className="app-settings">
        <RadioGroup inline label="Maximale Länge" value={sliderValue} onChange={setSliderValue}>
          {outputLengthRadios}
        </RadioGroup>
        <RadioGroup label="Randomness" value={radioValue} onChange={setRadioValue}>
          {randomnessRadios}
        </RadioGroup>
      </div>
    </div>
  )
}

export default App
