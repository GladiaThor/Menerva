import { Condition } from './enums/Condition'
import { ComparatorType } from './enums/ComparatorType'

/**
 * A predicate is a condition that must be met for an option to be available
 * to the player.
 *
 * @param condition The condition to be met
 * @param comparator The type of comparison to be made
 * @param value The value to be compared to
 * @param disableText The text to be displayed when the condition is not met
 * @param stateOwnerId The id of the state owner that should be used for the comparison
 *                      (no id means current player character or current scene)
 * @param hideOnDisable Whether the option should be hidden when the condition is not met
 */
export interface Predicate {
  condition: Condition
  comparator: ComparatorType
  value: { [key: string]: any }
  disableText?: string
  stateOwnerId?: string
  hideOnDisable?: boolean
}
