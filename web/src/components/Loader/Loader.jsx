import { Box, CircularProgress, Typography, styled } from '@mui/material'

// CUSTOM COMPONENTS
// CUSTOM BOX COMPONENT
const CustomBox = styled(Box)(() => ({
  '&.MuiBox-root': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 64px)',
  },
}))

const Loader = ({ label }) => {
  return (
    <CustomBox>
      <CircularProgress />
      {label && <Typography sx={{ mt: '5px' }}>{label}</Typography>}
    </CustomBox>
  )
}

export default Loader
