import type { Dispatch, SetStateAction } from 'react'
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material'
import { graphql, usePreloadedQuery } from 'react-relay'
import type { PreloadedQuery } from 'react-relay'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import type { PageInfo } from 'relay-runtime'

import usePageControl from '@/hooks/usePageControl'
import { showYearDay } from '@/utils/date'
import useColorMode from '@/hooks/useColorMode'

import type { ArticleListQuery } from '@/__generated__/ArticleListQuery.graphql'
import { isNotNull } from '@/utils/filter'
import NoDataTable from '@/components/status/NoDataTable'
import RangePaginationBox from '@/components/list/RangePaginationBox'

export const articleListQuery = graphql`
  query ArticleListQuery(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: ArticleFilter
  ) {
    articleSearch(
      first: $first
      after: $after
      last: $last
      before: $before
      filter: $filter
    ) @connection(key: "ArticleList_articleSearch") {
      totalCount
      edges {
        node {
          id
          title
          createdAt
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`

type Props = {
  queryReference: PreloadedQuery<ArticleListQuery, Record<string, unknown>>
  setTotalCount: Dispatch<SetStateAction<number>>
  setPageInfo: Dispatch<SetStateAction<PageInfo | null>>
  sliceStart: number
  sliceEnd: number
  currentRange: number
  hasNextRange: boolean
  goNextRange: () => void
  hasPreviousRange: boolean
  goPreviousRange: () => void
}

export default function ArticleList({
  queryReference,
  setTotalCount,
  setPageInfo,
  sliceStart,
  sliceEnd,
  currentRange,
  hasNextRange,
  goNextRange,
  hasPreviousRange,
  goPreviousRange,
}: Props) {
  const { t } = useTranslation(['translation'])
  const navigate = useNavigate()
  const { colorMode } = useColorMode()
  const data = usePreloadedQuery<ArticleListQuery>(
    articleListQuery,
    queryReference
  )
  const totalCount = useMemo(() => {
    return data.articleSearch?.totalCount
  }, [data.articleSearch?.totalCount])

  const pageInfo = useMemo(() => {
    return data.articleSearch?.pageInfo
  }, [data.articleSearch?.pageInfo])

  const items = useMemo(() => {
    return data && data.articleSearch && data.articleSearch.edges
      ? data.articleSearch.edges
          .slice(sliceStart, sliceEnd)
          .filter(isNotNull)
          .map((edge) => {
            return edge.node
          })
          .filter(isNotNull)
      : []
  }, [data, sliceStart, sliceEnd])

  const itemLength = useMemo(() => items.length, [items])

  const {
    currentPage,
    pageCount,
    pageStartPosition,
    pageEndPosition,
    handlePageChange,
    pageStartNum,
    pageEndNum,
  } = usePageControl(
    totalCount,
    setTotalCount,
    pageInfo,
    setPageInfo,
    sliceStart,
    sliceEnd,
    currentRange,
    itemLength
  )

  if (!itemLength) {
    return <NoDataTable />
  }

  return (
    <>
      <RangePaginationBox
        currentRange={currentRange}
        hasNextRange={hasNextRange}
        goNextRange={goNextRange}
        hasPreviousRange={hasPreviousRange}
        goPreviousRange={goPreviousRange}
        currentPage={currentPage}
        pageCount={pageCount}
        handlePageChange={handlePageChange}
        pageStartNum={pageStartNum}
        pageEndNum={pageEndNum}
        totalCount={totalCount}
        backgroundColor={colorMode === 'light' ? 'grey.50' : 'grey.900'}
      >
        <TableContainer component={Box}>
          <Table>
            <TableHead
              sx={{
                backgroundColor: colorMode === 'light' ? 'grey.50' : 'grey.900',
              }}
            >
              <TableRow>
                <TableCell>
                  <Typography variant="caption" color="secondary.dark">
                    {t('articleTitle')}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="caption" color="secondary.dark">
                    {t('createdAtDay')}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.slice(pageStartPosition, pageEndPosition).map((item) => {
                return (
                  <TableRow
                    hover
                    onClick={() => navigate(`/detail/${item.id}`)}
                    sx={{ cursor: 'pointer' }}
                    key={item.id}
                  >
                    <TableCell>
                      <Typography
                        variant="caption"
                        color="secondary.dark"
                        fontWeight={700}
                      >
                        {item.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="caption" color="secondary.dark">
                        {item?.createdAt != null &&
                          showYearDay(item?.createdAt as string)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </RangePaginationBox>
    </>
  )
}
