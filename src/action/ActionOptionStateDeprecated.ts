import { GameStateContext } from '../GameState/GameContext'
import { types } from 'mobx-state-tree'

export const ActionOptionStateDeprecated = types
  .model('ActionOptionB', {
    name: types.string,
    id: types.string,
    effect: types.frozen()
  })
  .views((self) => ({
    get name() {
      return self.name
    },
    get id() {
      return self.id
    },
    get effect() {
      return self.effect
    }
  }))

export interface ActionOption {
  name: string
  id: string
  effect: (gameContextProps: GameStateContext) => void
}
