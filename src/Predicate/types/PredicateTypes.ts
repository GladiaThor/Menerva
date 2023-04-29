import { Trait } from '../../character/Trait'
import { ActionOption } from '../../action/ActionOption'
import { NavigationOption } from '../../navigation/NavigationOption'

export type Character = {
  id?: string
  firstName?: string
  lastName?: string
  description?: string
  isKnown?: boolean
  isPlayable?: boolean
  skills?: { [key: string]: number }
  stats?: { [key: string]: number }
  traits?: { [key: string]: Trait }
  portrait?: string
  picture?: string
}

export interface Scene {
  id?: string
  name?: string
  image?: string
  description?: string
  actions?: ActionOption[]
  navOptions?: NavigationOption[]
}
