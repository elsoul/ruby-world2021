import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Toolbar, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import RangePagination from '@/components/list/RangePagination'

type Props = {
  currentRange: number
  hasNextRange: boolean
  goNextRange: () => void
  hasPreviousRange: boolean
  goPreviousRange: () => void
  currentPage: number
  pageCount: number
  handlePageChange: (value: number) => void
  pageStartNum: number
  pageEndNum: number
  totalCount: number
  backgroundColor: string
  children: ReactNode
}

export default function RangePaginationBox({
  currentRange,
  hasNextRange,
  goNextRange,
  hasPreviousRange,
  goPreviousRange,
  currentPage,
  pageCount,
  handlePageChange,
  pageStartNum,
  pageEndNum,
  totalCount,
  backgroundColor,
  children,
}: Props) {
  const { t } = useTranslation(['translation'])
  const theme = useTheme()
  return (
    <>
      <Box
        px={2}
        sx={{
          backgroundColor,
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
            <RangePagination
              currentRange={currentRange}
              hasNextRange={hasNextRange}
              goNextRange={goNextRange}
              hasPreviousRange={hasPreviousRange}
              goPreviousRange={goPreviousRange}
              currentPage={currentPage}
              pageCount={pageCount}
              handlePageChange={handlePageChange}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Toolbar variant="dense" disableGutters>
              <div style={{ flexGrow: 1 }} />
              <Typography
                variant="caption"
                color="secondary.light"
                lineHeight="32px"
              >
                {t('currentPage', { pageStartNum, pageEndNum, totalCount })}
              </Typography>
            </Toolbar>
          </Grid>
        </Grid>
      </Box>
      {children}
      <Box
        px={2}
        sx={{
          backgroundColor,
          borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
            <RangePagination
              currentRange={currentRange}
              hasNextRange={hasNextRange}
              goNextRange={goNextRange}
              hasPreviousRange={hasPreviousRange}
              goPreviousRange={goPreviousRange}
              currentPage={currentPage}
              pageCount={pageCount}
              handlePageChange={handlePageChange}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <Toolbar variant="dense" disableGutters>
              <div style={{ flexGrow: 1 }} />
              <Typography
                variant="caption"
                color="secondary.light"
                lineHeight="32px"
              >
                {t('currentPage', { pageStartNum, pageEndNum, totalCount })}
              </Typography>
            </Toolbar>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
