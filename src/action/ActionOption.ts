import { Predicate } from '../Predicate/Predicate'
import { Instance } from 'mobx-state-tree'
import { GameState } from '../GameState/GameState'

export interface ActionOption {
  name: string
  effect: (gameState: Instance<typeof GameState> | undefined | null) => void
  enableCondition?: Predicate[]
}
