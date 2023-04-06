import * as React from 'react'

import { ActionsList } from '../../action/ActionsList'
import { Grid, Paper, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import NavigationList from '../../navigation/NavigationList'
import { Scene } from './Scene'
import { Instance } from 'mobx-state-tree'

const useStyles = makeStyles()((theme) => ({
  root: {
    background: theme.palette.background.default
  },
  description: {
    borderRadius: 0,
    padding: '5px 15px 5px 15px'
  },
  header: {
    color: theme.palette.text.disabled
  },
  buttonList: {
    padding: 15
  },
  image: {
    maxWidth: 768,
    maxHeight: 386,
    minWidth: 768,
    minHeight: 386
  }
}))

export const SceneRenderer: React.FC<Instance<typeof Scene>> = (
  scene: Instance<typeof Scene>
) => {
  const { classes } = useStyles()
  return (
    <>
      <Grid
        item
        container
        xs={12}
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        {scene.image && (
          <img src={scene.image} alt={scene.name} className={classes.image} />
        )}
        <Typography variant={'h3'} className={classes.header}>
          {scene.name}
        </Typography>
      </Grid>

      <Grid
        item
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.description}>
            <Typography variant={'body1'} style={{ whiteSpace: 'pre-line' }}>
              {scene.description}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Grid item xs={6} className={classes.buttonList}>
          {scene.navOptions && NavigationList(scene.navOptions)}
        </Grid>

        <Grid item xs={6} className={classes.buttonList}>
          {scene.actions && ActionsList(scene.actions)}
        </Grid>
      </Grid>
    </>
  )
}
