// IMPORTING PACKAGES/MODULES
import { Tab as MuiTab } from '@mui/material'
import { styled } from '@mui/material/styles'

// CUSTOM COMPONENTS
const CustomTab = styled(MuiTab)(() => ({
  // COMMON STYLES
  '&.MuiTab-root': {
    textTransform: 'none',
    minHeight: 'unset',
  },

  // SIZE STYLES
  '&.MuiTab-sizeSmall': {
    padding: '0x 5px!important',
    fontSize: '0.875rem!important',
  },
  '&.MuiTab-sizeMedium': {
    padding: '0x 10px!important',
    fontSize: '0.8rem!important',
  },
  '&.MuiTab-sizeLarge': {
    padding: '0px 25px',
    fontSize: '1rem',
    minHeight: '61px',
  },

  // ICON SIZE STYLES
  '&.MuiTab-iconSizeSmall': {
    fontSize: '1rem',
  },
  '&.MuiTab-iconSizeMedium': {
    fontSize: '1rem',
  },
  '& .MuiTab-iconSizeLarge': {
    fontSize: '1.5rem',
  },
}))

const Tab = ({ size, color, ...props }) => {
  // SETTING SIZE CLASS
  let sizeClass = 'MuiTab-sizeMedium MuiTab-iconSizeMedium'
  if (size === 'small') sizeClass = 'MuiTab-sizeSmall MuiTab-iconSizeSmall'
  else if (size === 'large') sizeClass = 'MuiTab-sizeLarge MuiTab-iconSizeLarge'

  // SETTING COLOR CLASS
  let colorClass = 'MuiTab-primary'
  if (color === 'secondary') colorClass = 'MuiTab-secondary'

  return (
    <CustomTab
      {...props}
      className={`${
        props.className ? props.className : ''
      } ${sizeClass} ${colorClass}`}
    />
  )
}
export default Tab
