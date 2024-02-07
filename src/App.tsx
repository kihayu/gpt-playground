import React from 'react'
import { TextField } from './components/TextField'
import { Slider } from './components/Slider'
import { RadioGroup } from './components/RadioGroup'
import { Radio } from 'react-aria-components'
import { TextArea } from './components/TextArea'
import { Button } from './components/Button'
import './App.css'

function App() {
  const [userInput, setUserInput] = React.useState('')
  const [sliderValue, setSliderValue] = React.useState(1000)
  const [radioValue, setRadioValue] = React.useState('normal')

  const radioChildren = [
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
        <TextArea className="react-aria-TextField app-system-input-wrapper" inputClassName='app-system-input' label="System" />
      </div>
      <div className="app-chat">
        <div className="app-messages"></div>
        <div className="app-user-message">
          <TextField
            className="react-aria-TextField app-user-message-input-wrapper"
            inputClassName='app-user-message-input'
            label="Eingabe"
            value={userInput}
            onChange={setUserInput}
          />
          <Button className="react-aria-Button app-user-message-button">Senden</Button>
        </div>
      </div>
      <div className="app-settings">
        <Slider
          label="Maximale Länge"
          defaultValue={sliderValue}
          minValue={200}
          maxValue={2000}
          onChange={setSliderValue}
        />
        <RadioGroup label="Randomness" value={radioValue} onChange={setRadioValue}>
          {radioChildren}
        </RadioGroup>
      </div>
    </div>
  )
}

export default App
