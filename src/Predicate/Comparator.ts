import { Predicate } from './Predicate'
import { Condition } from './enums/Condition'
import { isMatchWith } from 'lodash'
import { getSnapshot, Instance, resolveIdentifier } from 'mobx-state-tree'
import { GameState } from '../GameState/GameState'
import { Character } from '../character/Character'
import { ComparatorType } from './enums/ComparatorType'
import { Scene } from '../UI/DefaultScenographyService/Scene'

export interface ComparisonResult {
  isDisabled: boolean
  isHidden: boolean
  disableTexts?: string[]
}

//Types taken from lodash, will need to be updated if lodash is updated
type PropertyName = string | number | symbol
type isMatchWithCustomizer = (
  value: any,
  other: any,
  indexOrKey: PropertyName,
  object: object,
  source: object
) => boolean | undefined
type isMatchType = (object: object, source: object) => boolean
type isMatchWithCustomizerType = (
  object: object,
  source: object,
  customizer: isMatchWithCustomizer
) => boolean

export interface ComparisonInput {
  comparisonFunction: isMatchType | isMatchWithCustomizerType
  customizer: (objValue: any, srcValue: any) => boolean
  predicateObject: any | undefined
  predicateValue: any | undefined
  disableText: string | undefined
  hideOnDisable: boolean | undefined
}

/**
 * Resolved the defines comparison in the comparison input
 * @param comparisonFunction The function that compares the two objects
 * @param predicateObject The object that is the source of the comparison
 * @param predicateValue The object that is compared to the source
 * @param disableText The text that is displayed when the comparison fails
 * @param hideOnDisable Whether the option should be hidden when the comparison fails
 * @param customizer The customizer function that should be used when comparing the two objects (lodash isMatchWith only)
 * @constructor
 *
 * example:
 *  predicateObject = { 'Agility': 5, 'Strength': 10 }
 *  predicateValue = { 'Agility': 5 }
 *  comparisonFunction = isMatch
 *  should result in a match
 *
 *  predicateObject = { 'Agility': 5, 'Strength': 10 }
 *  predicateValue = { 'Agility': 8 }
 *  comparisonFunction = isMatchWith
 *  customizer = (objValue, srcValue) => objValue >= srcValue
 *  should result in a match
 */
const ComparisonResolver = ({
  comparisonFunction,
  predicateObject,
  predicateValue,
  disableText,
  hideOnDisable,
  customizer
}: ComparisonInput): ComparisonResult => {
  const isEnabled = comparisonFunction(
    predicateObject || {},
    predicateValue,
    customizer
  )
  return {
    isDisabled: !isEnabled,
    isHidden: hideOnDisable ? !isEnabled : false,
    disableTexts: disableText ? [disableText] : []
  }
}

/**
 * Resolves the commutative comparison between the predicate and the game state.
 * Reduces the result of the comparison to a single comparison result.
 *
 * @param predicates
 * @param gameState
 * @constructor
 */
export const Comparator = (
  predicates: Predicate[] | undefined,
  gameState: Instance<typeof GameState> | null
): ComparisonResult => {
  if (predicates === undefined || gameState === null) {
    return { isDisabled: false, isHidden: false }
  }

  return predicates
    .map((predicate) => {
      const comparisonInput = resolveComparisonInput(predicate, gameState)
      if (comparisonInput === undefined) {
        console.warn('Predicate not implemented')
        return { isDisabled: false, isHidden: false }
      }

      return ComparisonResolver(comparisonInput)
    })
    .reduce((acc, curr) => {
      return {
        isDisabled: acc.isDisabled && curr.isDisabled,
        isHidden: acc.isHidden || curr.isHidden,
        disableTexts: acc.disableTexts?.concat(curr.disableTexts || [])
      }
    })
}

const customiseResolver = (condition: Condition) => {
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
      // @ts-ignore
      return (objValue: any, srcValue: any) => false
  }
}

const resolveComparisonInput = (
  predicate: Predicate,
  gameState: Instance<typeof GameState>
): ComparisonInput | undefined => {
  switch (predicate.comparator) {
    case ComparatorType.CHARACTER_STAT:
      return {
        customizer: customiseResolver(predicate.condition),
        hideOnDisable: predicate.hideOnDisable,
        comparisonFunction: isMatchWith,
        predicateObject: resolveCharacter(predicate, gameState)?.stats,
        predicateValue: predicate.value,
        disableText: predicate.disableText
      }
    default:
      return undefined
  }
}

const resolveCharacter = (
  predicate: Predicate,
  gameState: Instance<typeof GameState>
) => {
  const charId = predicate.stateOwnerId || gameState.currentCharacterId
  const character = resolveIdentifier(
    Character,
    gameState.characterRoster,
    charId
  )
  return character !== undefined ? getSnapshot(character) : undefined
}

// @ts-ignore
const resolveScene = (
  predicate: Predicate,
  gameState: Instance<typeof GameState>
) => {
  const sceneId = predicate.stateOwnerId || gameState.currentSceneId
  const scene = resolveIdentifier(Scene, gameState.storyBook, sceneId)
  return scene !== undefined ? getSnapshot(scene) : undefined
}
