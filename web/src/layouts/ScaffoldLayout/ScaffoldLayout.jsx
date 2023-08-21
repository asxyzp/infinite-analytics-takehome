import { Box, styled } from '@mui/material'

import Header from 'src/components/Header/Header'

// CUSTOM COMPONENTS
// CUSTOM BOX COMPONENT
const CustomBox = styled(Box)(() => ({
  '&.MuiBox-root': {},
}))

const ScaffoldLayout = ({ children }) => {
  return (
    <>
      <Header />
      <CustomBox component="main">{children}</CustomBox>
    </>
  )
}

export default ScaffoldLayout
