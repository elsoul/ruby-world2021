import {
  Box,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { InboxRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

export default function NoDataTable() {
  const { t } = useTranslation(['translation'])
  const theme = useTheme()
  return (
    <>
      <TableContainer
        component={Box}
        sx={{ borderTop: 1, borderColor: 'grey.300' }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ border: 'none' }}>
                <Typography align="center">
                  <InboxRounded
                    style={{
                      color: theme.palette.secondary.light,
                      fontSize: '104px',
                    }}
                  />
                </Typography>
                <Typography
                  align="center"
                  variant="h6"
                  sx={{ color: theme.palette.secondary.light }}
                >
                  {t('noDataYet')}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
