import { Condition } from '../enums/Condition'
import { ComparatorType } from '../enums/ComparatorType'

/**
 * A comparison condition is a single condition that must be met for an option to be available.
 *
 * @param evaluationCondition The condition to be met
 * @param comparator The type of comparison to be made
 * @param name The name of the value to be compared to
 * @param value The value to be compared to
 * @param stateOwnerId The id of the state owner that should be used for the comparison
 */
export interface ComparisonCondition {
  evaluationCondition: Condition
  comparator: ComparatorType
  name: string
  value: number
  stateOwnerId?: string
}
