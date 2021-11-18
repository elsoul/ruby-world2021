import { Grid, Box, Skeleton } from '@mui/material'

export default function ImageListLoading() {
  return (
    <>
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
          <Grid item xs={6} sm={4} md={3} lg={2} xl={2} key={num}>
            <Box p={1}>
              <Box>
                <Skeleton variant="rectangular" height={80} width="100%" />
              </Box>
              <Box p={1}>
                <Skeleton />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
