import { Condition } from './enums/Condition'
import { getSnapshot, Instance, resolveIdentifier } from 'mobx-state-tree'
import { GameState } from '../GameState/GameState'
import { Character } from '../character/Character'
import { ComparatorType } from './enums/ComparatorType'
import { Scene } from '../UI/DefaultScenographyService/Scene'
import { Predicate } from './types/Predicate'
import { ComparisonCondition } from './types/ComparisonCondition'
import { PredicateComparisonResult } from './types/PredicateComparisonResult'

const comparatorFunctionResolver = (
  condition: Condition
): ((objValue: any, srcValue: any) => boolean) => {
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

// @ts-ignore
const resolveScene = (
  gameState: Instance<typeof GameState>,
  stateOwnerId?: string
) => {
  const sceneId = stateOwnerId || gameState.currentSceneId
  const scene = resolveIdentifier(Scene, gameState.storyBook, sceneId)
  return scene !== undefined ? getSnapshot(scene) : undefined
}

/**
 * Resolves a character from the game state.
 * If no stateOwnerId is provided, the current character is resolved.
 *
 * @param gameState
 * @param stateOwnerId
 */
const resolveCharacterB = (
  gameState: Instance<typeof GameState>,
  stateOwnerId?: string
) => {
  const charId = stateOwnerId || gameState.currentCharacterId
  const character = resolveIdentifier(
    Character,
    gameState.characterRoster,
    charId
  )
  return character !== undefined ? getSnapshot(character) : undefined
}

/**
 * Resolves the value for a single comparison condition.
 * @param comparisonCondition
 * @param gameState
 */
const resolveComparatorValue = (
  comparisonCondition: ComparisonCondition,
  gameState: Instance<typeof GameState>
) => {
  switch (comparisonCondition.comparator) {
    case ComparatorType.CHARACTER_STAT:
      return resolveCharacterB(gameState, comparisonCondition.stateOwnerId)
        ?.stats[comparisonCondition.name]
    default:
      return undefined
  }
}

/**
 * Evaluates a single predicate and returns the result.
 *
 * NOTE: This function uses includes to find if any predicates are true since the
 * spacetime complexity is MAX O(n) while the complexity for reduce is MIN O(n).
 * This allows for the developer to use optimize the predicate list by placing the most likely
 * to be fail predicates at the beginning of the list.
 *
 * @param predicate
 * @param gameState
 */
const testSinglePredicate = (
  predicate: Predicate,
  gameState: Instance<typeof GameState>
): PredicateComparisonResult => {
  //
  const comparisonFail: boolean = predicate.conditions
    .map((condition) => {
      const evaluationFunction = comparatorFunctionResolver(
        condition.evaluationCondition
      )
      const comparatorValue = resolveComparatorValue(condition, gameState)
      return evaluationFunction(comparatorValue, condition.value)
    })
    .includes(false)

  return {
    isDisabled: comparisonFail,
    isHidden: !!(predicate.hideOnDisable && comparisonFail),
    disableTexts:
      predicate.disableText && comparisonFail ? [predicate.disableText] : []
  }
}

/**
 * A list of predicates that are evaluated as a group. If any of the predicates are false, the group is false.
 * @param predicates
 * @param gameState
 * @returns if the group is disabled, hidden, and the concatenated list of disable texts
 */
export const Comparator = (
  predicates: Predicate[] | undefined,
  gameState: Instance<typeof GameState> | null
): PredicateComparisonResult => {
  if (predicates === undefined || gameState === null) {
    return { isDisabled: false, isHidden: false, disableTexts: [] }
  }
  return predicates
    .map((predicate) => testSinglePredicate(predicate, gameState))
    .reduce((acc, curr) => {
      return {
        isDisabled: acc.isDisabled && curr.isDisabled,
        isHidden: acc.isHidden || curr.isHidden,
        disableTexts: acc.disableTexts?.concat(curr.disableTexts)
      }
    })
}
