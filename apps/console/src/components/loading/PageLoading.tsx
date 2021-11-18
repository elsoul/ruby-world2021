import { Box, Skeleton } from '@mui/material'

export default function PageLoading() {
  return (
    <>
      <Box m={1}>
        <Skeleton height={24} width="100%" />
        <Skeleton height={24} width="90%" />
        <Skeleton height={24} width="80%" />
      </Box>
    </>
  )
}
