import { Fade } from '@mui/material'
import { SceneRenderer } from './SceneRenderer'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useGameStateContext } from '../../GameState/useGameStateContext'
import { Instance } from 'mobx-state-tree'
import { Scene } from './Scene'
import { observer } from 'mobx-react-lite'
import { SceneContainerGrid } from '../../styles/SceneContainerGrid'

const Index: React.FC = () => {
  const { gameState } = useGameStateContext()

  const [queuedScene, setQueuedScene] = useState<string | undefined>()
  const [activeScene, setActiveScene] = useState<Instance<typeof Scene>>()

  useEffect(() => {
    if (gameState !== undefined) {
      setQueuedScene(gameState?.currentSceneId)
    }
  }, [gameState?.currentSceneId])

  return (
    <SceneContainerGrid
      container
      direction='column'
      justifyContent='flex-start'
      alignItems='center'
    >
      <Fade
        in={!queuedScene}
        addEndListener={() => {
          new Promise((resolve) => setTimeout(resolve, 200)).then(() => {
            if (queuedScene != null && gameState)
              setActiveScene(gameState?.getScene(queuedScene))
            setQueuedScene(undefined)
          })
        }}
      >
        <div>{activeScene && <SceneRenderer {...activeScene} />}</div>
      </Fade>
    </SceneContainerGrid>
  )
}

export default observer(Index);
