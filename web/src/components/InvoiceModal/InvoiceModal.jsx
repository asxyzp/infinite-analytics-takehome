import { Cancel } from '@mui/icons-material'
import { Box, Typography, styled, useMediaQuery } from '@mui/material'
import { useRecoilState } from 'recoil'

import { modalTypeAtom, sharedDataAtom } from 'src/contexts/atoms'

import IconButton from '../IconButton/IconButton'
import { formatDueAt } from '../Invoice/Invoices'
import InvoiceView from '../InvoiceView/InvoiceView'

// CUSTOM COMPONENTS
// CUSTOM BOX COMPONENT
const CustomBox = styled(Box)(({ theme }) => ({
  '&.MuiBox-root': {
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    minHeight: '100%',
    position: 'fixed',
    zIndex: '1200',
    background: theme.palette.background.default,
  },
  '& .invoice-modal-header': {
    padding: '10px',
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .invoice-modal-header-meta': {
    flexGrow: '1',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  '& .invoice-modal-body': {
    background:
      theme.palette.mode === 'light'
        ? theme.palette.grey.main
        : theme.palette.background.paper,
    minHeight: 'calc(100vh  - 63px)',
    width: '100%',
    paddingTop: '30px',
  },
}))

const InvoiceModal = () => {
  // SETTING MEDIA QUERY
  const isSmallDesktop = useMediaQuery('(max-width:1200px)')

  // GETTING ATOMIC STATES
  const [sharedData] = useRecoilState(sharedDataAtom)
  const [modalType, setModalType] = useRecoilState(modalTypeAtom)

  /**
   * @name closeModal
   * @description METHOD TO CLOSE MODAL
   * @returns {undefined} undefined
   */
  const closeModal = () => setModalType('')

  return (
    isSmallDesktop && (
      <CustomBox>
        <Box className="invoice-modal-header">
          <Box className="invoice-modal-header-meta">
            <Typography variant="body1">View Invoice</Typography>
            <Typography variant="body2">
              {sharedData.id ? sharedData.id : '#RANDOM'}
            </Typography>
          </Box>
          <IconButton onClick={closeModal}>
            <Cancel />
          </IconButton>
        </Box>
        <Box className="invoice-modal-body">
          <InvoiceView
            sx={{
              '&.invoice-view': {
                marginTop: '0px',
              },
            }}
            id={sharedData.id ? sharedData.id : '#RANDOM'}
            dueAt={formatDueAt(sharedData.dueAt)}
            sellerName={sharedData.sellerName}
            sellerPhone={sharedData.sellerPhone}
            sellerEmail={sharedData.sellerEmail}
            sellerAddress={sharedData.sellerAddress}
            buyerName={sharedData.buyerName}
            buyerPhone={sharedData.buyerPhone}
            buyerEmail={sharedData.buyerEmail}
            buyerAddress={sharedData.buyerAddress}
            lineItems={sharedData.lineItems}
            paymentTerms={sharedData.paymentTerms}
          />
        </Box>
      </CustomBox>
    )
  )
}

export default InvoiceModal
