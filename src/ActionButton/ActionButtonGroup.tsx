import { FC, useEffect, useState } from 'react'
import { ActionButtonGroupHeader } from './Styles'
import { ActionButton } from './index.ts'
import * as React from 'react'
import { ButtonGroup } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'
import { ButtonGroupPropsColorOverrides } from '@mui/material/ButtonGroup/ButtonGroup'
import { ActionButtonProps } from './ActionButtonProps'
import { ActionOption } from '../action/ActionOption'
import { useGameStateContext } from '../GameState/useGameStateContext'
import { onPatch } from 'mobx-state-tree'
import { ComperatorB } from '../Predicate/Comparator'
import { observer } from 'mobx-react-lite'

interface ActionButtonGroupProps {
  color?: OverridableStringUnion<
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning',
    ButtonGroupPropsColorOverrides
  >
  header?: string
  actionOptions: ActionOption[]
  actionGroupKey?: string
}

const ActionButtonGroup: FC<ActionButtonGroupProps> = ({
  color,
  header,
  actionOptions,
  actionGroupKey
}) => {
  const { gameState } = useGameStateContext()
  const [actions, setActions] = useState<ActionButtonProps[]>([])

  useEffect(() => {
    prepareAndSetActions()
  }, [actionOptions])

  onPatch(gameState?.getCurrentPlayerCharacter(), () => {
    prepareAndSetActions()
  })

  const prepareAndSetActions = () => {
    const mappedActions = actionOptions
      .map((action) => {
        const comparisonResult = ComperatorB(action.enableCondition, gameState)
        return {
          disabled: comparisonResult.isDisabled,
          hidden: comparisonResult.isHidden,
          key: `${actionGroupKey || 'action'}-${action.name}`,
          name: action.name,
          disabledTooltip: comparisonResult.disableTexts,
          onClick: () => {
            action.effect(gameState)
          }
        }
      })
      .filter((action) => !action.hidden)

    setActions(mappedActions)
  }
  return (
    <ButtonGroup orientation='vertical' color={color} sx={{ width: '100%' }}>
      <ActionButtonGroupHeader
        disableRipple
        disableElevation
        disableFocusRipple
        variant='contained'
      >
        {header || 'Actions'}
      </ActionButtonGroupHeader>
      {actions.map((action) => (
        <ActionButton action={action} key={action.key} />
      ))}
    </ButtonGroup>
  )
}

export default observer(ActionButtonGroup)
