import {
  FieldError,
  Label,
  RadioGroup as AriaRadioGroup,
  RadioGroupProps as AriaRadioGroupProps,
  Text,
  ValidationResult,
} from 'react-aria-components'

import './RadioGroup.css'

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, 'children'> {
  children?: React.ReactNode
  inline?: boolean
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function RadioGroup({
  inline,
  label,
  description,
  errorMessage,
  children,
  ...props
}: Readonly<RadioGroupProps>) {
  const radioGroupClassName = `react-aria-RadioGroup${inline ? ' react-aria-RadioGroup-inline' : ''}`

  return (
    <AriaRadioGroup {...props} className={radioGroupClassName}>
      <Label>{label}</Label>
      <div className="react-aria-RadioGroup-children">{children}</div>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </AriaRadioGroup>
  )
}
