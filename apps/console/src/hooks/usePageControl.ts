import { useState, useCallback, useMemo, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { PageInfo } from 'relay-runtime'

export default function usePageControl(
  totalCount: number,
  setTotalCount: Dispatch<SetStateAction<number>>,
  pageInfo: PageInfo,
  setPageInfo: Dispatch<SetStateAction<PageInfo | null>>,
  sliceStart: number,
  sliceEnd: number,
  currentRange: number,
  itemLength: number
) {
  const pageItems = useMemo(() => {
    return (sliceEnd - sliceStart + 1) / 5
  }, [sliceEnd, sliceStart])

  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(5)
  const [pageStartPosition, setPageStartPosition] = useState(0)
  const [pageEndPosition, setPageEndPosition] = useState(pageItems)

  const pageChange = useCallback(
    (value: number) => {
      setCurrentPage(value)
      if (value <= pageCount) {
        setPageStartPosition((value - 1) * pageItems)
        setPageEndPosition(value * pageItems)
      } else {
        setPageStartPosition(((value % 5) - 1) * pageItems)
        setPageEndPosition((value % 5) * pageItems)
      }
    },
    [pageItems, pageCount]
  )

  const handlePageChange = useCallback(
    (value: number) => {
      pageChange(value)
      const pageComponent = document.getElementById('page-component')
      if (pageComponent != null) {
        pageComponent.scrollTop = 0
      }
    },
    [pageChange]
  )

  const pageStartNum = useMemo(() => {
    const startNum = sliceStart + pageStartPosition + 1
    return startNum
  }, [sliceStart, pageStartPosition])

  const pageEndNum = useMemo(() => {
    const endNum = sliceStart + pageEndPosition
    if (endNum < totalCount) {
      return endNum
    } else {
      return totalCount
    }
  }, [totalCount, sliceStart, pageEndPosition])

  useEffect(() => {
    setPageCount(Math.ceil(itemLength / pageItems))
    setTotalCount(totalCount ?? 0)
    setPageInfo(pageInfo)
  }, [
    itemLength,
    setTotalCount,
    setPageInfo,
    pageItems,
    setPageCount,
    totalCount,
    pageInfo,
  ])

  useEffect(() => {
    pageChange((currentRange - 1) * 5 + 1)
  }, [pageChange, sliceStart, currentRange, totalCount])

  return {
    currentPage,
    pageCount,
    pageStartPosition,
    pageEndPosition,
    handlePageChange,
    pageStartNum,
    pageEndNum,
  }
}
