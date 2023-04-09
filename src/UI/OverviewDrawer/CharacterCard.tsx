import { FC, useEffect } from 'react'
import { Character } from '../../character/Character'
import { Avatar, Chip, Collapse, Divider, Grid } from '@mui/material'
import * as React from 'react'
import { makeStyles } from 'tss-react/mui'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { useGameStateContext } from '../../GameState/useGameStateContext'
import { Instance, onPatch } from 'mobx-state-tree'

const useStyles = makeStyles()((theme) => ({
  namePlate: {
    borderRadius: 0
  },
  portrait: {
    paddingTop: theme.spacing(2),
    height: 220,
    width: 220,
    border: 'whitesmoke'
  },
  picture: {
    paddingTop: theme.spacing(2),
    height: 310,
    width: 220,
    border: 'whitesmoke'
  },
  divider: {
    width: ['-webkit-fill-available', '-moz-available']
  },
  statCardGridItem: {
    padding: [theme.spacing(1), theme.spacing(1)]
  }
}))

const CharacterCard: FC = () => {
  const { classes } = useStyles()
  const [charImageOpen, setCharImageOpen] = React.useState(true)
  const [currentCharacter, setCurrentCharacter] =
    React.useState<Instance<typeof Character>>()

  const { gameState } = useGameStateContext()
  const toggleCharImage = () => {
    setCharImageOpen(!charImageOpen)
  }

  useEffect(() => {
    if (gameState !== undefined) {
      setCurrentCharacter(gameState?.getCharacter(gameState.currentCharacterId))
    }
  }, [gameState?.currentCharacterId])

  onPatch(gameState, (patch) => {
    if (patch.op === 'replace' && patch.path === '/currentCharacterId') {
      setCurrentCharacter(gameState?.getCharacter(patch.value))
    }
  })

  return (
    <div>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <Divider
          variant='middle'
          orientation='horizontal'
          light
          className={classes.divider}
        >
          <Chip
            label={`${currentCharacter?.firstName} ${
              currentCharacter?.lastName ? currentCharacter?.lastName : ''
            }`}
            color='secondary'
            className={classes.namePlate}
            variant='outlined'
            avatar={
              <Avatar
                alt={currentCharacter?.firstName}
                src={currentCharacter?.portrait}
              />
            }
            deleteIcon={charImageOpen ? <ArrowUpward /> : <ArrowDownward />}
            onDelete={() => {
              toggleCharImage()
            }}
          />
        </Divider>
        <Collapse in={charImageOpen} timeout='auto' unmountOnExit>
          <img
            src={currentCharacter?.picture}
            alt={currentCharacter?.firstName}
            className={classes.picture}
          />
        </Collapse>
      </Grid>
    </div>
  )
}

export default CharacterCard
