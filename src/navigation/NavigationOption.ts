import { Predicate } from '../Predicate/Predicate'

export interface NavigationOption {
  destinationRoomId: string
  travelTime?: number
  preTravelEffect?: () => void
  postTravelEffect?: () => void
  enableCondition?: Predicate[]
}
