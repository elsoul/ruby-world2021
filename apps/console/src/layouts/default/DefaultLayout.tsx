import type { ReactNode } from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import DefaultHeader from './DefaultHeader'
import DefaultFooter from './DefaultFooter'

type Props = {
  children: ReactNode
}

export default function DefaultLayout({ children }: Props) {
  const theme = useTheme()

  return (
    <>
      <header>
        <DefaultHeader />
      </header>
      <main id="page-component">
        <Box
          width="100%"
          minHeight="80vh"
          sx={{
            background: theme.palette.background.paper,
          }}
        >
          {children}
        </Box>
      </main>
      <footer>
        <DefaultFooter />
      </footer>
    </>
  )
}
