// IMPORTING PACKAGES/MODULES
import {
  Box,
  FormHelperText as MuiFormHelperText,
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
  Typography,
  InputLabel,
  ListItemIcon,
} from '@mui/material'
import { styled } from '@mui/material/styles'

// CUSTOM COMPONENTS
// CUSTOM BOX COMPONENT
const CustomBox = styled(Box)(() => ({
  /* MARGIN STYLES */
  '&.MuiSelect-margin-small': {
    marginBottom: '5px',
  },
  '&.MuiSelect-margin-medium': {
    marginBottom: '12.5px',
  },
  '&.MuiSelect-margin-large': {
    marginBottom: '20px',
  },
}))

// CUSTOM MENU ITEM COMPONENT
const CustomMenuItem = styled(MuiMenuItem)(() => ({
  // ROOT STYLES
  '&.MuiMenuItem-root': {
    borderRadius: '10px',
    margin: '5px',
    padding: '5px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  '& .MuiMenuItem-label': {
    flexGrow: '1',
  },
}))

const CustomListItemIcon = styled(ListItemIcon)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '5px',
}))

// CUSTOM BOX COMPONENT
const CustomInputLabel = styled(InputLabel)(() => ({
  '&.MuiInputLabel-root': {
    marginBottom: '5px',
  },
}))

// CUSTOM SELECT COMPONENT
const CustomSelect = styled(MuiSelect)(({ theme }) => ({
  // ROOT STYLES
  '&.MuiOutlinedInput-root': {
    borderRadius: '10px',
  },
  '& .MuiSelect-select': {
    padding: '10px 5px',
  },
  '&.MuiOutlinedInput-root:hover': {
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
  },

  // SIZE STYLES
  '&MuiInputBase-sizeSmall': {
    padding: '5px',
  },

  // ADORNMENT STYLES
  '&.MuiInputBase-adornedStart .MuiSvgIcon-root': {
    margin: '10px',
  },
  '&.MuiInputBase-adornedEnd .MuiSvgIcon-root': {
    margin: '10px',
  },

  // ICON STYLES
  '&.MuiInputBase-colorPrimary.Mui-focused .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
  '&.MuiInputBase-colorSecondary.Mui-focused .MuiSvgIcon-root': {
    color: theme.palette.secondary.main,
  },
  '&.MuiInputBase-colorError.Mui-focused .MuiSvgIcon-root': {
    color: theme.palette.error.main,
  },
  '&.MuiInputBase-colorInfo.Mui-focused .MuiSvgIcon-root': {
    color: theme.palette.info.main,
  },
  '&.MuiInputBase-colorSuccess.Mui-focused .MuiSvgIcon-root': {
    color: theme.palette.success.main,
  },
  '&.Mui-error .MuiSvgIcon-root': {
    color: `${theme.palette.error.main}!important`,
  },

  // FOCUSED STYLES
  '&.MuiInputBase-colorPrimary.Mui-focused': {
    boxShadow: `0 0 5px ${theme.palette.primary.main}`,
  },
  '&.MuiInputBase-colorSecondary.Mui-focused': {
    boxShadow: `0 0 5px ${theme.palette.secondary.main}`,
  },
  '&.MuiInputBase-colorInfo.Mui-focused': {
    boxShadow: `0 0 5px ${theme.palette.info.main}`,
  },
  '&.MuiInputBase-colorError.Mui-focused': {
    boxShadow: `0 0 5px ${theme.palette.error.main}`,
  },
  '&.MuiInputBase-colorSuccess.Mui-focused': {
    boxShadow: `0 0 5px ${theme.palette.success.main}`,
  },
  '&.MuiError.Mui-focused': {
    boxShadow: `0 0 5px ${theme.palette.error.main}`,
  },

  // SELECT STYLES
  '& .MuiSelect-icon': {
    margin: '0px 0px 0px 10px!important',
  },
  '& .MuiOutlinedInput-input': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  '& .MuiOutlinedInput-input > .MuiMenuItem-label': {
    flexGrow: '1',
  },
}))
const CustomFormHelperText = styled(MuiFormHelperText)(() => ({
  '&.MuiFormHelperText-root': {
    margin: '10px 0px',
    textAlign: 'center',
  },
}))

const Select = ({
  margin,
  label,
  placeholder,
  errorText,
  formHelperText,
  selectItems,
  ...props
}) => {
  // SETTING LOCAL VARIABLES
  // SETTING MARGIN CLASS
  let marginClass = ''
  if (margin === 'small') marginClass = 'MuiSelect-margin-small'
  else if (margin === 'medium') marginClass = 'MuiSelect-margin-medium'
  else if (margin === 'large') marginClass = 'MuiSelect-margin-large'

  return (
    <CustomBox className={marginClass}>
      {label && (
        <CustomInputLabel>
          <Typography variant="body2">{label}</Typography>
        </CustomInputLabel>
      )}
      <CustomSelect
        {...props}
        notched={false}
        variant="outlined"
        placeholder={placeholder}
        MenuProps={{
          sx: {
            '& .MuiMenu-list': {
              padding: '0px',
            },
            '& .MuiMenu-paper': {
              borderRadius: '15px',
              marginTop: '10px',
              padding: '0px',
            },
          },
        }}
      >
        {selectItems &&
          selectItems.map((selectItem) => {
            return (
              <CustomMenuItem
                key={selectItem.value}
                value={selectItem.value}
                disabled={selectItem.disabled}
              >
                {selectItem.icon && (
                  <CustomListItemIcon>{selectItem.icon}</CustomListItemIcon>
                )}
                <Box className="MuiMenuItem-label">{selectItem.label}</Box>
              </CustomMenuItem>
            )
          })}
      </CustomSelect>
      {formHelperText && !errorText && (
        <CustomFormHelperText>
          <Typography variant="body2">{formHelperText}</Typography>
        </CustomFormHelperText>
      )}
      {errorText && (
        <CustomFormHelperText component="div">
          <Typography variant="body2" sx={{ color: 'error.main' }}>
            {errorText}
          </Typography>
        </CustomFormHelperText>
      )}
    </CustomBox>
  )
}
export default Select
