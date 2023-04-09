import React, { FC } from 'react'
import { Divider, Drawer, Grid } from '@mui/material'
import CharacterCard from './CharacterCard'

const OverviewDrawer: FC = () => {
  const drawerWidth = 280

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        border: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'rgba(16,13,33,0.87)'
        }
      }}
      variant='permanent'
      anchor='left'
    >
      <Grid container direction='column' alignItems='center'>
        <Divider />
        <CharacterCard />
      </Grid>
    </Drawer>
  )
}
export default OverviewDrawer
