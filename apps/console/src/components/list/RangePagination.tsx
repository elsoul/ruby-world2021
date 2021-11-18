import { useMemo } from 'react'
import { Toolbar, Tooltip, IconButton, Typography, Box } from '@mui/material'
import { NavigateBeforeRounded, NavigateNextRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { useTheme } from '@mui/material/styles'
import useColorMode from '@/hooks/useColorMode'

type Props = {
  currentRange: number
  hasNextRange: boolean
  goNextRange: () => void
  hasPreviousRange: boolean
  goPreviousRange: () => void
  currentPage: number
  pageCount: number
  handlePageChange: (value: number) => void
}

export default function RangePagination({
  currentRange,
  hasNextRange,
  goNextRange,
  hasPreviousRange,
  goPreviousRange,
  currentPage,
  pageCount,
  handlePageChange,
}: Props) {
  const { t } = useTranslation(['translation'])
  const theme = useTheme()
  const { colorMode } = useColorMode()

  const pageArray = useMemo(() => {
    return new Array(pageCount).fill(0)
  }, [pageCount])
  const pages = useMemo(() => {
    return pageArray.map((_, i) => {
      const pageNum = (currentRange - 1) * 5 + i + 1
      return pageNum
    })
  }, [pageArray, currentRange])

  return (
    <>
      <Toolbar variant="dense" disableGutters>
        {hasPreviousRange ? (
          <Tooltip title={t('previousPages') || false} placement="top">
            <IconButton
              size="small"
              onClick={goPreviousRange}
              color="secondary"
            >
              <NavigateBeforeRounded />
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton size="small" disabled>
            <NavigateBeforeRounded />
          </IconButton>
        )}
        {pages.map((pageNum) => (
          <Box ml={1} key={pageNum}>
            <IconButton
              size="small"
              onClick={() => handlePageChange(pageNum)}
              sx={{
                background:
                  currentPage === pageNum
                    ? colorMode === 'light'
                      ? theme.palette.grey[300]
                      : theme.palette.grey[700]
                    : '',
              }}
            >
              <Typography
                variant="body2"
                color="secondary.dark"
                sx={{
                  width: '22px',
                  height: '22px',
                  lineHeight: '22px',
                }}
              >
                {pageNum}
              </Typography>
            </IconButton>
          </Box>
        ))}
        <Box ml={1}>
          {hasNextRange ? (
            <Tooltip title={t('nextPages') || false} placement="top">
              <IconButton size="small" onClick={goNextRange} color="secondary">
                <NavigateNextRounded />
              </IconButton>
            </Tooltip>
          ) : (
            <IconButton size="small" onClick={goNextRange} disabled>
              <NavigateNextRounded />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </>
  )
}
