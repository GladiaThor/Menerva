import { Predicate } from './Predicate'
import { Condition } from './enums/Condition'
import { isMatchWith } from 'lodash'
import { getSnapshot, Instance, resolveIdentifier } from 'mobx-state-tree'
import { GameState } from '../GameState/GameState'
import { Character as CharPredicate, Scene as ScenePredicate } from './types/PredicateTypes'
import { Character } from '../character/Character'
import { ComparableState } from './enums/ComparableState'
import { Scene } from '../UI/DefaultScenographyService/Scene'

export interface ComparisonResult {
  isDisabled: boolean,
  isHidden: boolean,
  disableTexts?: string[]
}

export const Comperator = (predicates: Predicate[] | undefined, gameState: Instance<typeof GameState> | null): boolean => {
  const isEnabled =
    (predicates === undefined || gameState === null) ? true :
      predicates.map(predicate => {
        const customizer = customiserResolver(predicate.condition)
        const predicateObject = resolvePredicateObject(predicate, gameState)
        const isDisabled = isMatchWith(predicateObject || {}, predicate.value, customizer)
        return isDisabled
      })
        .reduce((acc, curr) => acc && curr, true)

  return !isEnabled
}

export const ComperatorB = (predicates: Predicate[] | undefined, gameState: Instance<typeof GameState> | null): ComparisonResult => {

  const isEnabled: ComparisonResult =
    (predicates === undefined || gameState === null) ?
      { isDisabled: false, isHidden: false } :
      predicates.map(predicate => {
        const customizer = customiserResolver(predicate.condition)
        const predicateObject = resolvePredicateObject(predicate, gameState)
        const isEnabled = isMatchWith(predicateObject || {}, predicate.value, customizer)
        return {
          isDisabled: !isEnabled,
          isHidden: predicate.hideOnDisable ? !isEnabled : false,
          disableTexts: predicate.disableText ? [predicate.disableText] : []
        }
      }).reduce((acc, curr) => {
        return {
          isDisabled: acc.isDisabled && curr.isDisabled,
          isHidden: acc.isHidden || curr.isHidden,
          disableTexts: acc.disableTexts?.concat(curr.disableTexts || [])
        }
      })

  return isEnabled
}

const customiserResolver = (condition: Condition) => {
  switch (condition) {
    case Condition.EQUALS:
      return (objValue: any, srcValue: any) => objValue === srcValue
    case Condition.NOT_EQUALS:
      return (objValue: any, srcValue: any) => objValue !== srcValue
    case Condition.GREATER_THAN:
      return (objValue: any, srcValue: any) => objValue > srcValue
    case Condition.LESS_THAN:
      return (objValue: any, srcValue: any) => objValue < srcValue
    case Condition.GREATER_THAN_OR_EQUAL_TO:
      return (objValue: any, srcValue: any) => objValue >= srcValue
    case Condition.LESS_THAN_OR_EQUAL_TO:
      return (objValue: any, srcValue: any) => objValue <= srcValue
    case Condition.CONTAINS:
      return (objValue: any, srcValue: any) => objValue.includes(srcValue)
    case Condition.DOES_NOT_CONTAIN:
      return (objValue: any, srcValue: any) => !objValue.includes(srcValue)
    default:
      return (objValue: any, srcValue: any) => false
  }
}


const resolvePredicateObject = <T extends ScenePredicate | CharPredicate>(predicate: Predicate, gameState: Instance<typeof GameState>): any => {
  switch (predicate.stateToCompare) {
    case ComparableState.CHARACTER_STAT:
      return resolveCharacter(predicate, gameState)?.stats
    default:
      console.warn('Predicate not implemented')
      return undefined
  }

}


const resolveCharacter = (predicate: Predicate, gameState: Instance<typeof GameState>) => {
  const charId = predicate.stateOwnerId || gameState.currentCharacterId
  const character = resolveIdentifier(Character, gameState.characterRoster, charId)
  return character != undefined ? getSnapshot(character) : undefined
}

const resolveScene = (predicate: Predicate, gameState: Instance<typeof GameState>) => {
  const sceneId = predicate.stateOwnerId || gameState.currentSceneId
  const scene = resolveIdentifier(Scene, gameState.storyBook, sceneId)
  return scene != undefined ? getSnapshot(scene) : undefined

}
