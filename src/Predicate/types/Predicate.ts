import { ComparisonCondition } from './ComparisonCondition'

/**
 * A Predicate is a list of conditions that must be met for an option to be available.
 *
 * @param conditions The conditions to be met
 * @param hideOnDisable Whether the option should be hidden when the condition is not met
 * @param disableText The text to be displayed when the condition is not met
 */
export interface Predicate {
  conditions: ComparisonCondition[]
  hideOnDisable?: boolean
  disableText?: string
}
