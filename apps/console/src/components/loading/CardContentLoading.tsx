import { Box, Skeleton } from '@mui/material'
export default function CardContentLoading() {
  return (
    <>
      <Box p={2}>
        <Skeleton width="80%" />
        <Skeleton width="70%" />
        <Skeleton width="60%" />
      </Box>
    </>
  )
}
