import { Grid, Box, Container, Paper, Skeleton } from '@mui/material'

export default function SmallSinglePageLoading() {
  return (
    <>
      <Container maxWidth="sm">
        <Paper>
          <Box py={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  )
}
