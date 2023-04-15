import { ActionOption } from './ActionOption'
import * as React from 'react'
import { FC } from 'react'
import ActionButtonGroup from '../ActionButton/ActionButtonGroup'

interface ActionListProps {
  actionOptions: ActionOption[]
  actionHeader?: string
}

const ActionsList: FC<ActionListProps> = ({ actionOptions, actionHeader }) => {
  return (
    <ActionButtonGroup
      color='secondary'
      actionOptions={actionOptions}
      actionGroupKey='roomActions'
      header={actionHeader}
    />
  )
}

export default ActionsList
