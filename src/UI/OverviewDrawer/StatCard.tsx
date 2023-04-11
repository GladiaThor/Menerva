import { FC, useEffect } from 'react'
import * as React from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import { useGameStateContext } from '../../GameState/useGameStateContext'
import { getSnapshot, onPatch } from 'mobx-state-tree'
import { StatTableCell, StatTableContainer } from '../../styles/StatTable'

const StatCard: FC<{}> = () => {
  const { gameState } = useGameStateContext()

  const [characterStats, setCharacterStats] = React.useState<{
    [key: string]: number
  }>()

  useEffect(() => {
    handleCharacterStateChange()
  }, [])

  const handleCharacterStateChange = () => {
    if (gameState?.currentCharacterId !== undefined) {
      const character = gameState.getCharacter(gameState.currentCharacterId)
      if (character) {
        setCharacterStats(getSnapshot(character?.stats))
      }
    }
  }

  onPatch(gameState, (patch) => {
    if (patch.op === 'replace' && patch.path === '/currentCharacterId') {
      handleCharacterStateChange()
    }
  })

  onPatch(gameState?.getCurrentPlayerCharacter(), (patch) => {
    if (patch.op === 'replace' && patch.path.startsWith('/stats')) {
      handleCharacterStateChange()
    }
  })

  const createStatTable = () => {
    if (!characterStats) return <TableRow />

    const statEntries = Object.entries(characterStats)
    return statEntries.map((statEntry) => {
      return (
        <TableRow key={`${statEntry[0]}-row`}>
          <StatTableCell align='left'>{statEntry[0]}</StatTableCell>
          <StatTableCell align='right'>{statEntry[1]}</StatTableCell>
        </TableRow>
      )
    })
  }

  return (
    <StatTableContainer>
      <Table size='small' aria-label='Stat Table'>
        <TableBody>
          <TableRow>
            <TableCell align='center' colSpan={2} />
          </TableRow>
          {createStatTable()}
        </TableBody>
      </Table>
    </StatTableContainer>
  )
}

export default StatCard
