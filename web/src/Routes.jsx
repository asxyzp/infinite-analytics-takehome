import { CssBaseline, ThemeProvider } from '@mui/material'
import { useRecoilState } from 'recoil'

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import ModalRouter from './components/ModalRouter/ModalRouter'
import { darkModeAtom } from './contexts/atoms'
import DarkTheme from './styles/darkTheme'
import LightTheme from './styles/lightTheme'

const Routes = () => {
  // GETTING ATOMIC STATES
  const [isDarkMode] = useRecoilState(darkModeAtom)

  return (
    <ThemeProvider theme={isDarkMode ? DarkTheme : LightTheme}>
      <CssBaseline />
      <ModalRouter />
      <Router>
        <Set wrap={ScaffoldLayout}>
          <Route path="/invoices/new" page={InvoiceNewInvoicePage} name="newInvoice" />
          <Route path="/invoices/{id:Int}/edit" page={InvoiceEditInvoicePage} name="editInvoice" />
          <Route path="/invoices/{id:Int}" page={InvoiceInvoicePage} name="invoice" />
          <Route path="/" page={InvoiceInvoicesPage} name="invoices" />
        </Set>
        <Route notfound page={NotFoundPage} />
      </Router>
    </ThemeProvider>
  )
}

export default Routes
