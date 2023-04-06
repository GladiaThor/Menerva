import { ActionOption } from '../../action/ActionOption'
import { NavigationOption } from '../../navigation/NavigationOption'

export interface RoomDefinition {
  id: string
  name: string
  image?: string
  description: string | JSX.Element
  actions?: ActionOption[]
  navOptions?: NavigationOption[]
}
