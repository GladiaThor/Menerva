import { Condition } from './enums/Condition'
import { ComparableState } from './enums/ComparableState'

export interface Predicate {
  condition: Condition,
  stateToCompare: ComparableState,
  value: {[key: string]: any},
  disableText?: string,
  stateOwnerId?: string,
  hideOnDisable?: boolean,
}
