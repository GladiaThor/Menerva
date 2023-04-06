import { GameStateContext } from '../GameState/GameContext'

export interface ActionOption {
  name: string
  effect: (gameContextProps: GameStateContext) => void
}
