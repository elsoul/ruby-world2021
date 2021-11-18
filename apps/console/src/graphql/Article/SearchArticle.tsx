import { useState, useCallback, useMemo, Suspense, useEffect } from 'react'
import {
  Paper,
  Box,
  Toolbar,
  TextField,
  Tooltip,
  IconButton,
} from '@mui/material'
import { SearchRounded, RefreshRounded } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { useQueryLoader } from 'react-relay'
import { useForm, Controller } from 'react-hook-form'
import type { FieldError } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import useRangeControl from '@/hooks/useRangeControl'
import useColorMode from '@/hooks/useColorMode'

import type { ArticleListQuery } from '@/__generated__/ArticleListQuery.graphql'
import ArticleList, { articleListQuery } from '@/graphql/Article/ArticleList'
import DataTableLoading from '@/components/loading/DataTableLoading'
import CollectionPageErrorBoundary from '@/components/wrap/CollectionPageErrorBoundary'
import ShowRetryTable from '@/components/status/ShowRetryTable'

const titleMaxString = 100

const schema = z.object({
  title: z.string().max(titleMaxString),
})

type SearchArticleFormInput = {
  title: string
}

export default function SearchArticle() {
  const { t } = useTranslation(['translation'])
  const theme = useTheme()
  const { colorMode } = useColorMode()

  const {
    first,
    after,
    setTotalCount,
    setPageInfo,
    hasNextRange,
    goNextRange,
    hasPreviousRange,
    goPreviousRange,
    sliceStart,
    sliceEnd,
    goFirstRange,
    currentRange,
  } = useRangeControl(50)

  const [searchKeyword, setSearchKeyword] = useState<null | string>(null)

  const variables = useMemo(
    () => ({
      first,
      after,
      filter: {
        isDeleted: false,
        searchKeyword,
      },
    }),
    [first, after, searchKeyword]
  )

  const [queryReference, loadQuery] =
    useQueryLoader<ArticleListQuery>(articleListQuery)

  useEffect(() => {
    loadQuery(variables)
  }, [loadQuery, variables])

  const refetch = useCallback(() => {
    loadQuery(variables, { fetchPolicy: 'network-only' })
  }, [loadQuery, variables])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchArticleFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
    },
  })

  const onSubmit = useCallback(
    (input: SearchArticleFormInput) => {
      goFirstRange()
      if (input.title === '') {
        setSearchKeyword(null)
      } else {
        setSearchKeyword(input.title)
      }
    },
    [goFirstRange, setSearchKeyword]
  )

  const titleErrorHelperText = useCallback(
    (error: FieldError | undefined) => {
      if (!error) return ''
      if (error.type === 'too_big') {
        return t('tooLongMessage', { length: titleMaxString })
      }
      return t('pleaseCheckValue')
    },
    [t]
  )

  if (queryReference == null) {
    return (
      <>
        <Paper>
          <Box
            sx={{
              backgroundColor: colorMode === 'light' ? 'grey.50' : 'grey.900',
              borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
            }}
          >
            <Toolbar
              sx={{
                background: colorMode === 'light' ? 'grey.50' : 'grey.900',
                borderBottom: 1,
                borderColor: 'grey.300',
              }}
            >
              <TextField
                label={t('retailer:searchByName')}
                size="small"
                disabled
              />
              <Box ml={1}>
                <IconButton disabled>
                  <SearchRounded />
                </IconButton>
              </Box>
              <div style={{ flexGrow: 1 }} />
              <Tooltip
                title={t('retailer:searchUpdate') || false}
                placement="top"
              >
                <IconButton edge="end" onClick={() => refetch()}>
                  <RefreshRounded />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </Box>
          <DataTableLoading />
        </Paper>
      </>
    )
  }

  return (
    <>
      <Paper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              backgroundColor: colorMode === 'light' ? 'grey.50' : 'grey.900',
              borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
            }}
          >
            <Toolbar
              sx={{
                background: colorMode === 'light' ? 'grey.50' : 'grey.900',
              }}
            >
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('searchByKeyword')}
                    size="small"
                    error={!!errors.title}
                    helperText={titleErrorHelperText(errors.title)}
                  />
                )}
              />
              <Box ml={1}>
                <Tooltip title={t('searchExecute') || false} placement="top">
                  <IconButton type="submit">
                    <SearchRounded />
                  </IconButton>
                </Tooltip>
              </Box>
              <div style={{ flexGrow: 1 }} />
              <Tooltip title={t('searchUpdate') || false} placement="top">
                <IconButton edge="end" onClick={() => refetch()}>
                  <RefreshRounded />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </Box>
        </form>
        <Suspense fallback={<DataTableLoading />}>
          <CollectionPageErrorBoundary
            showRetry={<ShowRetryTable refetch={refetch} />}
          >
            <ArticleList
              queryReference={queryReference}
              setTotalCount={setTotalCount}
              setPageInfo={setPageInfo}
              sliceStart={sliceStart}
              sliceEnd={sliceEnd}
              currentRange={currentRange}
              hasNextRange={hasNextRange}
              goNextRange={goNextRange}
              hasPreviousRange={hasPreviousRange}
              goPreviousRange={goPreviousRange}
            />
          </CollectionPageErrorBoundary>
        </Suspense>
      </Paper>
    </>
  )
}
