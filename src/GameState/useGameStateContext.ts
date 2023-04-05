import { useContext } from 'react'
import { GameContext } from './GameContext'

export const useGameStateContext = () => {
  const gameState = useContext(GameContext)
  if (!gameState) {
    throw new Error(
      'useGameStateContext must be used within a GameStateProvider'
    )
  }
  const addScene = (scene: any) => {
    gameState?.gameState?.addScene(scene)
  }
  const navigateTo = (sceneId: string) => {
    gameState?.gameState?.navigateToScene(sceneId)
  }
  const addCharacter = (character: any) => {
    gameState?.gameState?.addCharacter(character)
  }
  const setPlayerCharacter = (characterId: string) => {
    gameState?.gameState?.setPlayerCharacter(characterId)
  }

  const getCrrentCharacter = () => {
    return gameState?.gameState?.getCurrentPlayerCharacter()
  }

  return {
    gameName: gameState.gameName,
    gameVersion: gameState.gameVersion,
    gameState: gameState.gameState,
    navigateTo: navigateTo,
    addScene: addScene,
    addCharacter: addCharacter,
    setPlayerCharacter: setPlayerCharacter,
    getCrrentCharacter: getCrrentCharacter
  }
}
