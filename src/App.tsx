import React from 'react'
import { TextField } from './components/TextField'
import { Slider } from './components/Slider'
import { RadioGroup } from './components/RadioGroup'
import { Radio } from 'react-aria-components'
import { TextArea } from './components/TextArea'
import { Button } from './components/Button'

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
    <div
      style={{
        display: 'grid',
        gap: '3rem',
        gridTemplateColumns: '300px 1fr 300px', // Updated gridTemplateColumns
        height: '100%',
      }}
    >
      <div style={{ gridColumn: '1' }}>
        <TextArea style={{ height: '100%', width: '100%' }} label="System" />
        {/* <textarea style={{ height: '100%', resize: 'none' }} /> */}
      </div>
      <div
        style={{
          gridColumn: '2',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ flex: '1' }}>
          {/* Chat interface will be implemented here */}
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'end' }}>
          {/* <input {...inputProps} style={{ flex: '1' }} />
          <button {...buttonProps}>Senden</button> */}
          <TextField
            style={{ flex: '1' }}
            label="Eingabe"
            value={userInput}
            onChange={setUserInput}
          />
          <Button style={{ height: '50px' }}>Senden</Button>
        </div>
      </div>
      <div
        style={{
          gridColumn: '3',
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
        }}
      >
        <Slider
          label="Maximale Länge"
          defaultValue={sliderValue}
          minValue={200}
          maxValue={2000}
          onChange={setSliderValue}
        />
        <RadioGroup
          label="Randomness"
          value={radioValue}
          onChange={setRadioValue}
        >
          {radioChildren}
        </RadioGroup>
      </div>
    </div>
  )
}

export default App
