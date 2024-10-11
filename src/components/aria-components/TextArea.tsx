import {
  FieldError,
  Label,
  Text,
  TextArea as AriaTextArea,
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  ValidationResult,
} from 'react-aria-components'

import './TextArea.css'

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string
  description?: string
  placeholder?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  inputClassName?: string
}

export function TextArea({ label, description, placeholder, errorMessage, inputClassName, ...props }: TextFieldProps) {
  return (
    <AriaTextField {...props}>
      <Label>{label}</Label>
      <AriaTextArea className={inputClassName} placeholder={placeholder} />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  )
}
