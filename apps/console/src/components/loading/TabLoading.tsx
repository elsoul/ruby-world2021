import { Container, Skeleton } from '@mui/material'

export default function TabLoading() {
  return (
    <>
      <Container maxWidth="md">
        <Skeleton width="90%" />
        <Skeleton width="80%" />
        <Skeleton width="70%" />
      </Container>
    </>
  )
}
