import * as React from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { DefaultTheme } from '../styles/DefaultTheme'
import GameContextProvider from '../GameState/GameContext'

interface GameServiceProps {
  children?: React.ReactNode
  muiTheme?: (darkMode?: boolean) => {}
  gameName?: string
  gameVersion?: string
}

const GameManager: React.FC<GameServiceProps> = ({
  children,
  muiTheme,
  gameName,
  gameVersion
}) => {
  const prefersDarkMode = true

  const theme = React.useMemo(() => {
    if (muiTheme == null) return createTheme(DefaultTheme(true))
    return createTheme(muiTheme(true))
  }, [prefersDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GameContextProvider gameName={gameName} gameVersion={gameVersion}>
        {children}
      </GameContextProvider>
    </ThemeProvider>
  )
}

export default GameManager
