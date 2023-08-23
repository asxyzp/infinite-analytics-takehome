import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  useMediaQuery,
} from '@mui/material'
import './invoiceView.css'

// CUSTOM COMPONENTS
// CUSTOM BOX COMPONENT
const CustomBox = styled(Box)(({ theme }) => ({
  '&.invoice-view': {
    color: theme.palette.common.black,
    background: theme.palette.common.white,
    margin: 'auto',
    marginTop: '75px',
    padding: '20px',
  },
  '& .invoice-header': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  '& .invoice': {
    fontWeight: 'bolder',
  },
  '& .invoice-entity-container': {
    marginBottom: '10px',
  },
  '& .invoice-entity-assign': {
    fontWeight: 'bolder',
  },
  '& .invoice-body': {
    marginTop: '30px',
    marginBottom: '20px',
  },
  '& .invoice-empty-line-items': {
    borderRadius: '10px',
    background: theme.palette.grey.main,
    border: `1px solid ${theme.palette.grey.main}`,
    minHeight: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  '& .invoice-signature': {
    marginTop: '40px',
  },
  '& .invoice-signature-greetings': {
    fontWeight: 'bolder',
  },
}))

const InvoiceView = ({
  id,
  dueAt,
  sellerName,
  sellerAddress,
  sellerPhone,
  sellerEmail,
  buyerName,
  buyerAddress,
  buyerPhone,
  buyerEmail,
  lineItems,
  paymentTerms,
}) => {
  // SETTING MEDIA QUERY
  const isSmallDesktop = useMediaQuery('(max-width:1200px)')

  // SETTING LOCAL VARIABLES
  const laborItems = lineItems.filter((lineItem) => {
    if (lineItem.type === 'labor') return true
    else return false
  })
  const materialItems = lineItems.filter((lineItem) => {
    if (lineItem.type === 'material') return true
    else return false
  })
  const workItems = lineItems.filter((lineItem) => {
    if (lineItem.type === 'work') return true
    else return false
  })

  return (
    <CustomBox className="invoice-view">
      <Box className="invoice-header">
        <Box className="invoice-meta-container">
          <Box className="invoice-entity-container">
            <Typography variant="body2" className="invoice-entity-assign">
              From
            </Typography>
            <Typography variant="body2">
              {sellerName ? sellerName : '[Insert seller name]'}
            </Typography>
            {sellerAddress && (
              <Typography variant="body2">Address: {sellerAddress}</Typography>
            )}
            {sellerPhone && (
              <Typography variant="body2">Phone no: {sellerPhone}</Typography>
            )}
            {sellerEmail && (
              <Typography variant="body2">Email: {sellerEmail}</Typography>
            )}
          </Box>
          <Box className="invoice-entity-container">
            <Typography variant="body2" className="invoice-entity-assign">
              To
            </Typography>
            <Typography variant="body2">
              {buyerName ? buyerName : '[Insert buyer name]'}
            </Typography>
            {buyerAddress && (
              <Typography variant="body2">Address: {buyerAddress}</Typography>
            )}
            {buyerPhone && (
              <Typography variant="body2">Phone no: {buyerPhone}</Typography>
            )}
            {buyerEmail && (
              <Typography variant="body2">Email: {buyerEmail}</Typography>
            )}
          </Box>
        </Box>
        <Box className="invoice-meta-container">
          <Typography
            variant={isSmallDesktop ? 'h6' : 'h4'}
            className="invoice"
          >
            Invoice
          </Typography>
          <Typography variant="body2">
            Invoice id: {id ? id : '#random'}
          </Typography>
          <Typography variant="body2">Due at {dueAt}</Typography>
        </Box>
      </Box>
      <Box className="invoice-body">
        {lineItems.length === 0 && (
          <Box className="invoice-empty-line-items">
            <Typography variant="body1">No line items found</Typography>
            <Typography variant="body2">
              Please add line items to complete this invoice
            </Typography>
          </Box>
        )}

        {/* LABOR ITEMS */}
        {laborItems.length > 0 && (
          <Box sx={{ mb: '10px' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bolder' }}>
              Labor line items
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={(theme) => {
                        return {
                          color: theme.palette.common.black,
                        }
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={(theme) => {
                        return {
                          color: theme.palette.common.black,
                        }
                      }}
                      align="right"
                    >
                      Rate (USD)
                    </TableCell>
                    <TableCell
                      sx={(theme) => {
                        return {
                          color: theme.palette.common.black,
                        }
                      }}
                      align="right"
                    >
                      No. of hours
                    </TableCell>
                    <TableCell
                      sx={(theme) => {
                        return {
                          color: theme.palette.common.black,
                        }
                      }}
                      align="right"
                    >
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {laborItems.map((laborItem, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={(theme) => {
                            return {
                              maxWidth: '200px',
                              color: theme.palette.common.black,
                            }
                          }}
                          component="th"
                          scope="row"
                        >
                          {laborItem.description}
                        </TableCell>
                        <TableCell
                          sx={(theme) => {
                            return {
                              color: theme.palette.common.black,
                            }
                          }}
                          align="right"
                        >
                          {laborItem.rate}
                        </TableCell>
                        <TableCell
                          sx={(theme) => {
                            return {
                              color: theme.palette.common.black,
                            }
                          }}
                          align="right"
                        >
                          {laborItem.unit}
                        </TableCell>
                        <TableCell
                          sx={(theme) => {
                            return {
                              color: theme.palette.common.black,
                            }
                          }}
                          align="right"
                        >
                          {Number(laborItem.rate) * Number(laborItem.unit)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* MATERIAL ITEMS */}
        {materialItems.length > 0 && (
          <Box sx={{ mb: '10px' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bolder' }}>
              Material line items
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={(theme) => {
                        return {
                          maxWidth: '200px',
                          color: theme.palette.common.black,
                        }
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={(theme) => {
                        return {
                          color: theme.palette.common.black,
                        }
                      }}
                      align="right"
                    >
                      Unit price
                    </TableCell>
                    <TableCell
                      sx={(theme) => {
                        return {
                          color: theme.palette.common.black,
                        }
                      }}
                      align="right"
                    >
                      No. of units
                    </TableCell>
                    <TableCell
                      sx={(theme) => {
                        return {
                          color: theme.palette.common.black,
                        }
                      }}
                      align="right"
                    >
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materialItems.map((workItem, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={(theme) => {
                            return {
                              maxWidth: '200px',
                              color: theme.palette.common.black,
                            }
                          }}
                          component="th"
                          scope="row"
                        >
                          {workItem.description}
                        </TableCell>
                        <TableCell
                          sx={(theme) => {
                            return {
                              color: theme.palette.common.black,
                            }
                          }}
                          align="right"
                        >
                          {workItem.rate}
                        </TableCell>
                        <TableCell
                          sx={(theme) => {
                            return {
                              color: theme.palette.common.black,
                            }
                          }}
                          align="right"
                        >
                          {workItem.unit}
                        </TableCell>
                        <TableCell
                          sx={(theme) => {
                            return {
                              color: theme.palette.common.black,
                            }
                          }}
                          align="right"
                        >
                          {Number(workItem.rate) * Number(workItem.unit)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* WORK-RELATED ITEMS */}
        {workItems.length > 0 && (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bolder' }}>
              Work-related line items
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={(theme) => {
                        return {
                          maxWidth: '200px',
                          color: theme.palette.common.black,
                        }
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={(theme) => {
                        return {
                          color: theme.palette.common.black,
                        }
                      }}
                      align="right"
                    >
                      Unit price
                    </TableCell>
                    <TableCell
                      sx={(theme) => {
                        return {
                          color: theme.palette.common.black,
                        }
                      }}
                      align="right"
                    >
                      No. of units
                    </TableCell>
                    <TableCell
                      sx={(theme) => {
                        return {
                          color: theme.palette.common.black,
                        }
                      }}
                      align="right"
                    >
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workItems.map((workItem, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={(theme) => {
                            return {
                              color: theme.palette.common.black,
                              maxWidth: '200px',
                            }
                          }}
                          component="th"
                          scope="row"
                        >
                          {workItem.description}
                        </TableCell>
                        <TableCell
                          sx={(theme) => {
                            return {
                              color: theme.palette.common.black,
                            }
                          }}
                          align="right"
                        >
                          {workItem.rate}
                        </TableCell>
                        <TableCell
                          sx={(theme) => {
                            return {
                              color: theme.palette.common.black,
                            }
                          }}
                          align="right"
                        >
                          {workItem.unit}
                        </TableCell>
                        <TableCell
                          sx={(theme) => {
                            return {
                              color: theme.palette.common.black,
                            }
                          }}
                          align="right"
                        >
                          {Number(workItem.rate) * Number(workItem.unit)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
      <Box className="invoice-footer">
        <Typography variant="body2">
          Payment instructions:{' '}
          {paymentTerms ? paymentTerms : '[Insert payment instructions here]'}.
          In case of any discrepanies in the invoice, please respond back at the
          earliest.
        </Typography>

        <Box className="invoice-signature">
          <Typography variant="body2" className="invoice-signature-greetings">
            Regards,
          </Typography>
          <Typography variant="body2">
            {sellerName ? sellerName : '[Insert seller name]'}
          </Typography>
        </Box>
      </Box>
    </CustomBox>
  )
}

export default InvoiceView
