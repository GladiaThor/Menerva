import { ActionOption } from './ActionOption'
import * as React from 'react'
import { Button } from '@mui/material'
import { useGameStateContext } from '../GameState/useGameStateContext'
import {
  ActionButtonGroup,
  ActionButtonGroupHeader
} from '../styles/ButtonStyles'
import { ComperatorB } from '../Predicate/Comperator'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import { onPatch } from 'mobx-state-tree'

interface ActionButtonProps {
  disabled: boolean
  key: string
  name: string
  onClick: () => void
}

interface ActionListProps {
  actionOptions: ActionOption[]
  actionHeader?: string
}

const ActionsList: FC<ActionListProps> = ({ actionOptions, actionHeader }) => {
  const { gameState } = useGameStateContext()
  const [actions, setActions] = useState<ActionButtonProps[]>([])

  useEffect(() => {
    prepareAndSetActions()
  }, [])

  onPatch(gameState?.getCurrentPlayerCharacter(), (patch) => {
    if (patch.op === 'replace' && patch.path.startsWith('/stats')) {
      prepareAndSetActions()
    }
  })

  const prepareAndSetActions = () => {
    const mappedActions = actionOptions
      .map((action) => {
        const comparisonResult = ComperatorB(action.enableCondition, gameState)
        return {
          disabled: comparisonResult.isDisabled,
          hidden: comparisonResult.isHidden,
          key: action.name,
          name: action.name,
          onClick: () => {
            action.effect(gameState)
          }
        }
      })
      .filter((action) => !action.hidden)

    setActions(mappedActions)
  }
  return (
    <ActionButtonGroup orientation='vertical' color={'secondary'}>
      <ActionButtonGroupHeader
        disableRipple
        disableElevation
        disableFocusRipple
        variant={'contained'}
      >
        {actionHeader || 'Actions'}
      </ActionButtonGroupHeader>
      {actions.map((action) => (
        <Button {...action} onClick={action.onClick}>
          {action.name}
        </Button>
      ))}
    </ActionButtonGroup>
  )
}

export default observer(ActionsList)
