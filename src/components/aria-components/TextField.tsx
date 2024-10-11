import {
  FieldError,
  Input,
  Label,
  Text,
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  ValidationResult,
} from 'react-aria-components'

import './TextField.css'

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string
  description?: string
  placeholder?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  inputClassName?: string
}

export function TextField({ label, description, placeholder, errorMessage, inputClassName, ...props }: TextFieldProps) {
  return (
    <AriaTextField {...props}>
      <Label>{label}</Label>
      <Input className={inputClassName} placeholder={placeholder} />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  )
}
