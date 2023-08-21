// IMPORTING PACKAGES/MODULES
import { Box, InputLabel, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

// CUSTOM COMPONENTS
// CUSTOM BOX COMPONENT
const CustomBox = styled(Box)(({ theme }) => ({
  '&.MuiBox-root': {
    borderRadius: '10px',
    border: `1px solid ${theme.palette.divider}`,
    margin: '0px 0px 10px 0px',
  },
  '& legend': {
    fontSize: '16px',
  },
  '& legend > p': { fontWeight: 'bolder' },
}))

const Fieldset = ({ legend, children, ...props }) => {
  return (
    <CustomBox component="fieldset" {...props}>
      <InputLabel component="legend">
        <Typography color="primary" variant="body2">
          {legend}
        </Typography>
      </InputLabel>
      {children}
    </CustomBox>
  )
}

export default Fieldset
