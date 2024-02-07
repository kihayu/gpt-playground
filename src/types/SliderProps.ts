export interface SliderProps {
  label: string
  minValue: number
  maxValue: number
  value: number
  setValue: (value: number) => void
}
