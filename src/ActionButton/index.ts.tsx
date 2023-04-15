import { FC, useState } from 'react'
import { Button, Collapse, Grid } from '@mui/material'
import * as React from 'react'
import { ActionButtonProps } from './ActionButtonProps'
import { ActionButtonToolTip } from './Styles'
import PsychologyAltSharpIcon from '@mui/icons-material/PsychologyAltSharp'

interface DisablableButtonProps {
  children?: React.ReactNode
  action: ActionButtonProps
}

export const ActionButton: FC<DisablableButtonProps> = ({ action }) => {
  const [openTooltip, setToolTip] = useState<boolean>(false)
  const handleOnMouseOver = (activate: boolean) => {
    setToolTip(activate)
  }
  const shouldAddOr = (index: number, list: string[]) => {
    return list.length > 1 && index !== 0
  }
  return (
    <Button
      key={action.key}
      onClick={action.disabled ? () => {} : action.onClick}
      onMouseEnter={() => handleOnMouseOver(true)}
      onMouseLeave={() => handleOnMouseOver(false)}
      endIcon={
        <PsychologyAltSharpIcon sx={{ opacity: action.disabled ? 1 : 0 }} />
      }
      disableTouchRipple={action.disabled}
      style={{
        textAlign: 'left'
      }}
    >
      <Grid
        container
        direction='column'
        justifyContent='space-between'
        alignItems='center'
        sx={{
          opacity: action.disabled ? 0.3 : 1
        }}
      >
        {action.name}
        <Collapse in={action.disabled && openTooltip}>
          {action.disabledTooltip?.map((tooltip, index, l) => (
            <div key={index}>
              {shouldAddOr(index, l) && (
                <ActionButtonToolTip variant='caption'>
                  ==OR==
                  <br />
                </ActionButtonToolTip>
              )}
              <ActionButtonToolTip variant='caption'>
                {tooltip}
                <br />
              </ActionButtonToolTip>
            </div>
          ))}
        </Collapse>
      </Grid>
    </Button>
  )
}
