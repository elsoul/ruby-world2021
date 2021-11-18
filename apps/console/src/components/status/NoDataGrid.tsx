import { Box, Typography } from '@mui/material'
import { InboxRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'

export default function NoDataTable() {
  const { t } = useTranslation(['translation'])
  const theme = useTheme()
  return (
    <>
      <Box p={2}>
        <Typography align="center">
          <InboxRounded
            style={{ color: theme.palette.secondary.light, fontSize: '104px' }}
          />
        </Typography>
        <Typography
          align="center"
          variant="h6"
          sx={{ color: theme.palette.secondary.light }}
        >
          {t('noDataYet')}
        </Typography>
      </Box>
    </>
  )
}
