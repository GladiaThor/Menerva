import { ActionOption } from './ActionOption'
import * as React from 'react'
import { Button } from '@mui/material'
import { useGameStateContext } from '../GameState/useGameStateContext'
import {
  ActionButtonGroup,
  ActionButtonGroupHeader
} from '../styles/ButtonStyles'

export const ActionsList = (
  actionOptions: ActionOption[],
  actionHeader?: string
) => {
  const gameStateContext = useGameStateContext()

  return (
    <ActionButtonGroup orientation='vertical' color='secondary'>
      <ActionButtonGroupHeader
        disableRipple
        disableElevation
        disableFocusRipple
        variant='contained'
      >
        {actionHeader || 'Actions'}
      </ActionButtonGroupHeader>
      {actionOptions.map((action) => (
        <Button
          onClick={() => {
            action.effect(gameStateContext)
          }}
          key={action.name}
        >
          {action.name}
        </Button>
      ))}
    </ActionButtonGroup>
  )
}
