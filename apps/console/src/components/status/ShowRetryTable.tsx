import { Box, Button, Typography } from '@mui/material'
import { ErrorRounded } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

type Props = {
  refetch: () => void
}

export default function ShowRetryTable({ refetch }: Props) {
  const theme = useTheme()
  const { t } = useTranslation(['translation'])

  return (
    <Box
      p={2}
      textAlign="center"
      sx={{ borderTop: 1, borderColor: 'grey.300' }}
    >
      <Typography>
        <ErrorRounded
          style={{ color: theme.palette.secondary.light, fontSize: '104px' }}
        />
      </Typography>
      <Typography variant="h6" sx={{ color: theme.palette.secondary.light }}>
        {t('networkError')}
      </Typography>
      <Box p={2}>
        <Button variant="contained" color="secondary" onClick={() => refetch()}>
          {t('retry')}
        </Button>
      </Box>
    </Box>
  )
}
