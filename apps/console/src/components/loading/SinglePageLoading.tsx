import { Grid, Box, Container, Skeleton } from '@mui/material'

export default function DetailPageLoading() {
  return (
    <>
      <Container maxWidth="md">
        <Box py={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box p={2}>
                <Skeleton width="50%" />
              </Box>
              <Box p={2}>
                <Skeleton variant="rectangular" height={300} width="100%" />
              </Box>
              <Box p={2}>
                <Skeleton width="80%" />
                <Skeleton width="70%" />
                <Skeleton width="60%" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box p={2}>
                <Skeleton width="50%" />
              </Box>
              <Box p={2}>
                <Skeleton width="90%" />
                <Skeleton width="80%" />
                <Skeleton width="70%" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}
