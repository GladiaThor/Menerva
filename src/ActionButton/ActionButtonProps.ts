export interface ActionButtonProps {
  disabled: boolean
  key: string
  name: string | undefined
  onClick: () => void
  disabledTooltip?: string[]
}
