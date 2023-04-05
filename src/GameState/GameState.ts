import { resolveIdentifier, types } from 'mobx-state-tree'
import { Scene } from '../UI/DefaultScenographyService/Scene'
import { Character } from '../character/Character'

export const GameState = types
  .model('GameState', {
    storyBook: types.map(Scene),
    characterRoster: types.map(Character),
    currentSceneId: types.optional(types.string, 'title-screen'),
    currentCharacterId: types.optional(types.string, 'player-character')
  })
  .actions((self) => ({
    addScene(scene: any) {
      self.storyBook.set(scene.id, scene)
    },
    removeScene(sceneId: string) {
      self.storyBook.delete(sceneId)
    },
    addCharacter(character: any) {
      self.characterRoster.set(character.id, character)
    },
    removeCharacter(characterId: string) {
      self.characterRoster.delete(characterId)
    },
    navigateToScene(sceneId: string) {
      self.currentSceneId = sceneId
    },
    setPlayerCharacter(characterId: string) {
      self.currentCharacterId = characterId
    }
  }))
  .views((self) => ({
    getScene(sceneId: string) {
      return resolveIdentifier(Scene, self.storyBook, sceneId)
    },
    getCurrentScene() {
      return resolveIdentifier(Scene, self.storyBook, self.currentSceneId)
    },
    isSceneAvailable(sceneId: string) {
      return self.storyBook.has(sceneId)
    },
    getSceneName(sceneId: string) {
      return self.storyBook.get(sceneId)?.name
    },
    getCurrentPlayerCharacter() {
      return resolveIdentifier(
        Character,
        self.characterRoster,
        self.currentCharacterId
      )
    },
    getCharacter(characterId: string) {
      return resolveIdentifier(Character, self.characterRoster, characterId)
    }
  }))
