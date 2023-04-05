import { Instance } from 'mobx-state-tree'
import { GameState } from './GameState'

export interface IGameProps {
  gameStateB?: Instance<typeof GameState> | undefined
}
