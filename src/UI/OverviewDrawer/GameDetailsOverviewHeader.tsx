import { FC } from 'react'
import { Grid, Typography } from '@mui/material'
import * as React from 'react'
import { makeStyles } from 'tss-react/mui'
import { GameContext } from '../../GameState/GameContext'

const useStyles = makeStyles()((theme) => ({
  gameName: {
    color: theme.palette.grey.A400,
    textAlign: 'center'
  },
  gameVersion: {
    color: theme.palette.grey.A400,
    paddingBottom: theme.spacing(1)
  },
  portrait: {
    width: 220,
    border: 'whitesmoke'
  }
}))

const CharacterCard: FC<{}> = () => {
  const { classes } = useStyles()
  const { gameName, gameVersion } = React.useContext(GameContext)

  return (
    <div>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs={12}>
          <Typography variant={'h5'} className={classes.gameName}>
            {gameName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant={'subtitle2'} className={classes.gameVersion}>
            Version: {gameVersion}
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default CharacterCard
