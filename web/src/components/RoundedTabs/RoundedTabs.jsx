// IMPORTING PACKAGES/MODULES
import { Tabs as MuiTabs } from '@mui/material'
import { styled } from '@mui/material/styles'

const RoundedTabs = styled(MuiTabs)(({ theme }) => ({
  '&.MuiTabs-root': {
    padding: '5px',
    background:
      theme.palette.mode === 'light'
        ? theme.palette.grey['200']
        : theme.palette.grey['dark'],
    borderRadius: '9999px',
  },
}))

export default RoundedTabs
