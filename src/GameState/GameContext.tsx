import * as React from 'react'
import { FC } from 'react'
import { Instance, onPatch, onSnapshot } from 'mobx-state-tree'
import { GameState } from './GameState'

export interface GameStateContext {
  gameState: Instance<typeof GameState> | null
  gameName?: string
  gameVersion?: string
}

export const GameContext = React.createContext<GameStateContext>({
  gameState: null,
  gameName: 'default',
  gameVersion: '0.0'
})

type Props = {
  children?: React.ReactNode
  gameName?: string
  gameVersion?: string
}

const gameState = GameState.create()

onSnapshot(gameState, (snapshot) => {
  localStorage.setItem('GameState', JSON.stringify(snapshot))
})

onPatch(gameState, (patch) => {
  console.log('Patch: ', patch)
})

const GameContextProvider: FC<Props> = ({
  children,
  gameVersion,
  gameName
}) => {
  return (
    <GameContext.Provider
      value={{
        gameState: gameState,
        gameName: gameName || 'default',
        gameVersion: gameVersion || '0.0'
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameContextProvider
