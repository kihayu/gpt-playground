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

  return (
    <div className="app">
      <div className="app-system">
        <TextArea
          className="react-aria-TextField app-system-input-wrapper"
          inputClassName="app-system-input"
          label="System"
        />
      </div>
      <div className="app-chat">
        <div className="app-messages">
          <ChatMessage author="System" message="How are you?" />
          <ChatMessage author="User" message="I'm fine, thank you!" />
          <ChatMessage author="System" message="What are you up to?" />
          <ChatMessage author="User" message="Just working on some code." />
          <ChatMessage author="System" message="Do you need any help?" />
          <ChatMessage author="User" message="Yes, I'm having trouble with a function." />
          <ChatMessage author="System" message="Can you describe the problem?" />
          <ChatMessage author="User" message="I'm getting an undefined error." />
          <ChatMessage author="System" message="Have you checked the variable declarations?" />
          <ChatMessage author="User" message="Let me check." />
          <ChatMessage author="System" message="Take your time." />
          <ChatMessage author="User" message="I found the issue, thanks!" />
          <ChatMessage author="System" message="You're welcome! Anything else you need?" />
          <ChatMessage author="User" message="No, that's all for now." />
          <ChatMessage author="System" message="Alright, happy coding!" />
        </div>
        <div className="app-user-message">
          <TextField
            className="react-aria-TextField app-user-message-input-wrapper"
            inputClassName="app-user-message-input"
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
