export interface NavigationOption {
  destinationRoomId: string
  travelTime?: number
  preTravelEffect?: () => void
  postTravelEffect?: () => void
}
