import { useState, useMemo, useCallback } from 'react'
import type { PageInfo } from 'relay-runtime'

export default function useRangeControl(initialRange: number) {
  const [currentRange, setCurrentRange] = useState(1)
  const [first, setFirst] = useState<number>(initialRange)
  const [after, setAfter] = useState<null | string>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [pageInfo, setPageInfo] = useState<null | PageInfo>(null)

  const maxRangeNum = Math.ceil(totalCount / first)

  const hasNextRange = useMemo(() => {
    return pageInfo?.hasNextPage || currentRange < maxRangeNum
  }, [currentRange, pageInfo?.hasNextPage, maxRangeNum])

  const hasPreviousRange = useMemo(() => {
    return currentRange > 1
  }, [currentRange])

  const sliceStart = useMemo(() => {
    return (currentRange - 1) * first
  }, [currentRange, first])

  const sliceEnd = useMemo(() => {
    return currentRange * first - 1
  }, [currentRange, first])

  const goNextRange = useCallback(() => {
    if (currentRange < maxRangeNum) {
      setCurrentRange(currentRange + 1)
      setAfter(pageInfo?.endCursor ?? null)
    }
  }, [pageInfo?.endCursor, currentRange, maxRangeNum])

  const goPreviousRange = useCallback(() => {
    if (currentRange > 1) {
      setCurrentRange(currentRange - 1)
    }
  }, [currentRange])

  const goFirstRange = useCallback(() => {
    setAfter(null)
    setCurrentRange(1)
  }, [setAfter])

  return {
    first,
    setFirst,
    after,
    setAfter,
    totalCount,
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
  }
}
