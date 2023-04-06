import { NavigationOption } from './NavigationOption'
import * as React from 'react'
import {
  ActionButtonGroup,
  ActionButtonGroupHeader
} from '../styles/ButtonStyles'
import { Button } from '@mui/material'
import { useGameStateContext } from '../GameState/useGameStateContext'

const NavigationList = (
  navigationOptions: NavigationOption[],
  navigationHeader?: string
) => {
  const { gameState } = useGameStateContext()

  const navAction = (navOption: NavigationOption) => {
    if (!gameState?.getCurrentScene()) {
      return
    }
    if (gameState?.currentSceneId !== navOption.destinationRoomId) {
      if (navOption.preTravelEffect) navOption.preTravelEffect()
      gameState?.navigateToScene(navOption.destinationRoomId)
      if (navOption.postTravelEffect) navOption.postTravelEffect()
    } else {
      console.log(`Already in room ${navOption.destinationRoomId}`)
    }
  }

  // @ts-ignore
  const createNavButtonIfSceneAvailable = (navOption: NavigationOption) => {
    if (gameState?.isSceneAvailable(navOption.destinationRoomId)) {
      return (
        <Button
          onClick={() => navAction(navOption)}
          key={navOption.destinationRoomId}
        >
          {gameState.getSceneName(navOption.destinationRoomId)}
        </Button>
      )
    } else {
      console.warn(
        `Scene ${navOption.destinationRoomId} is not available. You may have forgotten to add it to the storybook.`
      )
    }
  }

  return (
    <ActionButtonGroup orientation='vertical' color='primary'>
      <ActionButtonGroupHeader
        disableRipple
        disableTouchRipple
        disableElevation
        disableFocusRipple
        variant='contained'
      >
        {navigationHeader || 'Travel to...'}
      </ActionButtonGroupHeader>
      {navigationOptions.map((navigation) =>
        createNavButtonIfSceneAvailable(navigation)
      )}
    </ActionButtonGroup>
  )
}

export default NavigationList
