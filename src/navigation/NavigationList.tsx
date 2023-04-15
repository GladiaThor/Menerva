import { NavigationOption } from './NavigationOption'
import * as React from 'react'
import { useGameStateContext } from '../GameState/useGameStateContext'
import { ActionOption } from '../action/ActionOption'
import { Instance } from 'mobx-state-tree'
import { GameState } from '../GameState/GameState'
import ActionButtonGroup from '../ActionButton/ActionButtonGroup'
import { FC, useEffect, useState } from 'react'

interface NavigationListProps {
  navigationOptions: NavigationOption[]
  navigationHeader?: string
}

const NavigationList: FC<NavigationListProps> = ({
  navigationOptions,
  navigationHeader
}) => {
  const { gameState } = useGameStateContext()
  const [actions, setActions] = useState<ActionOption[]>([])

  useEffect(() => {
    console.log('NavigationList useEffect called')
    setActions(
      navigationOptions.map((navOption) => createActionOption(navOption))
    )
  }, [navigationOptions])

  const resolveNavActionName = (destinationId: string): string => {
    const name = gameState?.getSceneName(destinationId)
    if (!name)
      console.warn(
        `Scene ${destinationId} is not available. You may have forgotten to add it to the storybook.`
      )
    return name || destinationId
  }

  const resolveActionEffect = (
    navOption: NavigationOption
  ): ((gameState: Instance<typeof GameState> | undefined | null) => void) => {
    return (gameState: Instance<typeof GameState> | undefined | null) => {
      if (gameState?.currentSceneId !== navOption.destinationRoomId) {
        if (navOption.preTravelEffect) navOption.preTravelEffect()
        gameState?.navigateToScene(navOption.destinationRoomId)
        if (navOption.postTravelEffect) navOption.postTravelEffect()
      } else {
        console.log(`Already in room ${navOption.destinationRoomId}`)
      }
    }
  }

  const createActionOption = (navOptions: NavigationOption): ActionOption => {
    return {
      name: resolveNavActionName(navOptions.destinationRoomId),
      effect: resolveActionEffect(navOptions),
      enableCondition: navOptions.enableCondition,
      executionTime: navOptions.travelTime
    }
  }

  return (
    <ActionButtonGroup
      header={navigationHeader || 'Travel to...'}
      color='primary'
      actionOptions={actions}
      actionGroupKey='navigation'
    />
  )
}

export default NavigationList
