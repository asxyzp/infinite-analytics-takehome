import { DarkMode, LightMode } from '@mui/icons-material'
import { Box, Divider, Typography, styled } from '@mui/material'
import { useRecoilState } from 'recoil'

import { Link, routes } from '@redwoodjs/router'

import { darkModeAtom } from 'src/contexts/atoms'

import Button from '../Button/Button'
import IconButton from '../IconButton/IconButton'

// CUSTOM COMPONENTS
// CUSTOM BOX COMPONENT
const CustomBox = styled(Box)(() => ({
  '&.MuiBox-root': {
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '& .header-app-name': {
    fontSize: '2em',
    fontWeight: 'bolder',
    textDecoration: 'none',
    lineHeight: '1',
  },
  '& .header-actions-container': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .header-theme-toggle-button': {
    marginRight: '5px',
  },
}))

const Header = () => {
  // GETTING ATOMIC STATES
  const [isDarkMode, setDarkMode] = useRecoilState(darkModeAtom)

  // METHODS
  /**
   * @name toggleDarkMode
   * @description METHOD TO TOGGLE DARK MODE
   * @returns {undefined} undefined
   */
  const toggleDarkMode = () => setDarkMode(!isDarkMode)

  return (
    <>
      <CustomBox component="header">
        <Typography
          component={Link}
          to={routes.invoices()}
          variant="logo"
          className="header-app-name"
          color="primary"
        >
          Invogen
        </Typography>
        <Box className="header-actions-container">
          <IconButton
            className="header-theme-toggle-button"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <DarkMode /> : <LightMode />}
          </IconButton>
          <Link to={routes.newInvoice()}>
            <Button
              size="xs"
              color="primary"
              variant="outlined"
              className="header-create-invoice-link"
            >
              New invoice
            </Button>
          </Link>
        </Box>
      </CustomBox>
      <Divider />
    </>
  )
}

export default Header
