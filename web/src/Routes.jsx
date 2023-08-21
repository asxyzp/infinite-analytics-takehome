// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Invoices" titleTo="invoices" buttonLabel="New Invoice" buttonTo="newInvoice">
        <Route path="/invoices/new" page={InvoiceNewInvoicePage} name="newInvoice" />
        <Route path="/invoices/{id:Int}/edit" page={InvoiceEditInvoicePage} name="editInvoice" />
        <Route path="/invoices/{id:Int}" page={InvoiceInvoicePage} name="invoice" />
        <Route path="/invoices" page={InvoiceInvoicesPage} name="invoices" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
