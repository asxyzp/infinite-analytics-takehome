import { useState } from 'react'

import {
  ReportProblemOutlined,
  CheckCircleOutlined,
  MoreHoriz,
  FilePresent,
  Receipt,
  Visibility,
  Edit,
  Delete,
} from '@mui/icons-material'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from '@mui/material'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IconButton from 'src/components/IconButton/IconButton'
import { QUERY } from 'src/components/Invoice/InvoicesCell'
import Menu from 'src/components/Menu/Menu'
import Tab from 'src/components/Tab/Tab'
import TabPanel from 'src/components/TabPanel/TabPanel'
import Tabs from 'src/components/Tabs/Tabs'

// MUTATIONS & QUERIES
const DELETE_INVOICE_MUTATION = gql`
  mutation DeleteInvoiceMutation($id: Int!) {
    deleteInvoice(id: $id) {
      id
    }
  }
`

// CUSTOM COMPONENTS
// CUSTOM LIST CONTAINER
const CustomListContainer = styled(Box)(() => ({
  padding: '5px 20px 0px',
  '& .invoices-list-title': {
    fontWeight: 'bolder',
  },
  '& .invoices-divider': {
    marginBottom: '5px',
  },
}))

// CUSTOM LIST ITEM COMPONENT
const CustomList = styled(List)(() => ({
  padding: '0px',
}))

// CUSTOM LIST ITEM COMPONENT
const CustomListItem = styled(ListItem)(() => ({
  padding: '0px',
}))

// CUSTOM LIST ITEM BUTTON COMPONENT
const CustomListItemButton = styled(ListItemButton)(() => ({
  padding: '0px',
}))

// CUSTOM LIST AVATAR COMPONENT
const CustomListItemAvatar = styled(ListItemAvatar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  marginRight: '10px',
  height: '55px',
  width: '55px',
  background: `linear-gradient(to top, ${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
}))

const InvoicesList = ({ invoices }) => {
  // SETTING LOCAL STATES
  const [tabValue, setTabValue] = useState(0)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const open = Boolean(menuAnchorEl)

  // MUTATION METHODS
  // DELETING THE INVOICE
  const [deleteInvoice] = useMutation(DELETE_INVOICE_MUTATION, {
    onCompleted: () => toast.success('Invoice deleted'),
    onError: (error) => toast.error(error.message),
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  // METHODS
  /**
   * @name setTab
   * @description METHOD TO SET TAB VALUE
   * @param {*} event EVENT OBJECT
   * @param {*} value VALUE
   * @returns {undefined} undefined
   */
  const setTab = (event, value) => {
    console.log(value)
    setTabValue(value)
  }

  /**
   * @name setInvoiceDelete
   * @description METHOD TO DELETE INVOICE
   * @param {*} id INVOICE ID
   * @returns {undefined} undefined
   */
  const setInvoiceDelete = (id) => {
    if (confirm('Are you sure you want to delete invoice ' + id + '?')) {
      deleteInvoice({ variables: { id } })
    }
  }

  /**
   * @name openMenu
   * @description METHOD TO OPEN MENU
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const openMenu = (event) => setMenuAnchorEl(event.currentTarget)

  /**
   * @name closeMenu
   * @description METHOD TO CLOSE MENU
   * @returns {undefined} undefined
   */
  const closeMenu = () => setMenuAnchorEl(null)

  // SETTING LOCAL VARIABLES
  const menuItems = [
    {
      label: 'View',
      icon: <Visibility />,
    },
    {
      label: 'Edit',
      icon: <Edit />,
    },
    {
      label: 'Delete',
      icon: <Delete />,
    },
  ]

  const setDueAt = (dueAt) => {
    return `${new Date(dueAt).getDate()}/${new Date(
      dueAt
    ).getMonth()}/${new Date(dueAt).getFullYear()} ${
      new Date(dueAt).getHours() > 12
        ? new Date(dueAt).getHours() - 12
        : new Date(dueAt).getHours()
    }:${new Date(dueAt).getMinutes()} ${
      new Date(dueAt).getHours() > 12 ? 'PM' : 'AM'
    }`
  }

  return (
    <Box>
      <CustomListContainer>
        <Typography variant="h5" className="invoices-list-title">
          Invoices
        </Typography>
        <Typography variant="body2" className="invoices-list-description">
          Get outstanding, paid & late invoices
        </Typography>
      </CustomListContainer>
      <Tabs value={tabValue} onChange={setTab}>
        <Tab
          label="Outstanding"
          icon={<FilePresent fontSize="small" />}
          iconPosition="start"
        />
        <Tab
          label="Paid"
          icon={<CheckCircleOutlined fontSize="small" />}
          iconPosition="start"
        />
        <Tab
          label="Late"
          icon={<ReportProblemOutlined fontSize="small" />}
          iconPosition="start"
        />
      </Tabs>
      <Divider className="invoices-divider" />
      <TabPanel value={0} index={tabValue}>
        <CustomListContainer>
          <CustomList sx={{ width: '100%' }}>
            {invoices.map((invoice, index) => {
              return (
                <CustomListItem
                  disablePadding
                  key={index}
                  secondaryAction={
                    <>
                      <IconButton edge="end" onClick={openMenu}>
                        <MoreHoriz />
                      </IconButton>
                      <Menu
                        open={open}
                        anchorEl={menuAnchorEl}
                        onClose={closeMenu}
                        menuItems={menuItems.map((menuItem) => {
                          if (menuItem.label === 'View')
                            return {
                              ...menuItem,
                              onClick: () =>
                                navigate(routes.invoice({ id: invoice.id })),
                            }
                          else if (menuItem.label === 'Edit')
                            return {
                              ...menuItem,
                              onClick: () =>
                                navigate(
                                  routes.editInvoice({ id: invoice.id })
                                ),
                            }
                          else if (menuItem.label === 'Delete')
                            return {
                              ...menuItem,
                              onClick: () => setInvoiceDelete(invoice.id),
                            }
                        })}
                        className="user-menu"
                      />
                    </>
                  }
                >
                  <CustomListItemButton>
                    <CustomListItemAvatar>
                      <Receipt />
                    </CustomListItemAvatar>
                    <ListItemText>
                      <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
                        {invoice.title}
                      </Typography>
                      <Typography variant="body2">
                        {invoice.description}
                      </Typography>
                      <Typography variant="body2">
                        Due by {setDueAt(invoice.dueAt)}
                      </Typography>
                    </ListItemText>
                  </CustomListItemButton>
                </CustomListItem>
              )
            })}
          </CustomList>
        </CustomListContainer>
      </TabPanel>
      <TabPanel value={1} index={tabValue}>
        <CustomListContainer>
          <CustomList sx={{ width: '100%' }}>
            {invoices.map((invoice, index) => {
              return (
                <CustomListItem
                  disablePadding
                  key={index}
                  secondaryAction={
                    <>
                      <IconButton edge="end" onClick={openMenu}>
                        <MoreHoriz />
                      </IconButton>
                      <Menu
                        open={open}
                        anchorEl={menuAnchorEl}
                        onClose={closeMenu}
                        menuItems={menuItems.map((menuItem) => {
                          if (menuItem.label === 'View')
                            return {
                              ...menuItem,
                              onClick: () =>
                                navigate(routes.invoice({ id: invoice.id })),
                            }
                          else if (menuItem.label === 'Edit')
                            return {
                              ...menuItem,
                              onClick: () =>
                                navigate(
                                  routes.editInvoice({ id: invoice.id })
                                ),
                            }
                          else if (menuItem.label === 'Delete')
                            return {
                              ...menuItem,
                              onClick: () => setInvoiceDelete(invoice.id),
                            }
                        })}
                        className="user-menu"
                      />
                    </>
                  }
                >
                  <CustomListItemButton>
                    <CustomListItemAvatar>
                      <Receipt />
                    </CustomListItemAvatar>
                    <ListItemText>
                      <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
                        {invoice.title}
                      </Typography>
                      <Typography variant="body2">
                        {invoice.description}
                      </Typography>
                      <Typography variant="body2">
                        Due by {setDueAt(invoice.dueAt)}
                      </Typography>
                    </ListItemText>
                  </CustomListItemButton>
                </CustomListItem>
              )
            })}
          </CustomList>
        </CustomListContainer>
      </TabPanel>
      <TabPanel value={2} index={tabValue}>
        <CustomListContainer>
          <CustomList sx={{ width: '100%' }}>
            {invoices.map((invoice, index) => {
              return (
                <CustomListItem
                  disablePadding
                  key={index}
                  secondaryAction={
                    <>
                      <IconButton edge="end" onClick={openMenu}>
                        <MoreHoriz />
                      </IconButton>
                      <Menu
                        open={open}
                        anchorEl={menuAnchorEl}
                        onClose={closeMenu}
                        menuItems={menuItems.map((menuItem) => {
                          if (menuItem.label === 'View')
                            return {
                              ...menuItem,
                              onClick: () =>
                                navigate(routes.invoice({ id: invoice.id })),
                            }
                          else if (menuItem.label === 'Edit')
                            return {
                              ...menuItem,
                              onClick: () =>
                                navigate(
                                  routes.editInvoice({ id: invoice.id })
                                ),
                            }
                          else if (menuItem.label === 'Delete')
                            return {
                              ...menuItem,
                              onClick: () => setInvoiceDelete(invoice.id),
                            }
                        })}
                        className="user-menu"
                      />
                    </>
                  }
                >
                  <CustomListItemButton>
                    <CustomListItemAvatar>
                      <Receipt />
                    </CustomListItemAvatar>
                    <ListItemText>
                      <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
                        {invoice.title}
                      </Typography>
                      <Typography variant="body2">
                        {invoice.description}
                      </Typography>
                      <Typography variant="body2">
                        Due by {setDueAt(invoice.dueAt)}
                      </Typography>
                    </ListItemText>
                  </CustomListItemButton>
                </CustomListItem>
              )
            })}
          </CustomList>
        </CustomListContainer>
      </TabPanel>
    </Box>
  )
}

export default InvoicesList
