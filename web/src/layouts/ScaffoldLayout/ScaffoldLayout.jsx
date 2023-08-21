import { Box } from '@mui/material'

import Header from 'src/components/Header/Header'

const ScaffoldLayout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box component="main">{children}</Box>
    </Box>
  )
}

export default ScaffoldLayout
