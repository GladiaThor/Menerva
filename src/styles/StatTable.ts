import { styled, TableCell, TableContainer } from '@mui/material'

export const StatTableContainer = styled(TableContainer)(({ theme }) =>
  theme.unstable_sx({
    background: 'transparent',
    padding: [theme.spacing(1), theme.spacing(1)],
    color: theme.palette.grey.A400,
    width: 220
  })
)

export const StatTableCell = styled(TableCell)(({ theme }) =>
  theme.unstable_sx({
    color: theme.palette.grey.A400
  })
)
