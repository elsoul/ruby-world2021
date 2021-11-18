import { useState, useEffect } from 'react'
import {
  Box,
  AppBar,
  useMediaQuery,
  Drawer,
  Skeleton,
  Toolbar,
  IconButton,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { MenuRounded } from '@mui/icons-material'

import PageLoading from '@/components/loading/PageLoading'

export default function ConsoleLayoutLoading() {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const [menuCollapsed, setMenuCollapsed] = useState(false)
  const theme = useTheme()
  const xsDisplay = useMediaQuery(theme.breakpoints.down('sm'))
  const mdUpDisplay = useMediaQuery(theme.breakpoints.up('md'))
  useEffect(() => {
    if (mdUpDisplay) {
      setMenuCollapsed(false)
    } else {
      setMenuCollapsed(true)
    }
  }, [mdUpDisplay])
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: theme.palette.background.paper,
          boxShadow: 0,
          marginLeft: xsDisplay ? '0px' : menuCollapsed ? '64px' : '208px',
          width: xsDisplay
            ? '100%'
            : menuCollapsed
            ? 'calc(100% - 64px)'
            : 'calc(100% - 208px)',
        }}
      >
        <Toolbar sx={{ background: theme.palette.background.paper }}>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileMenuVisible(true)}
            sx={{
              display: {
                xs: 'block',
                sm: 'none',
                md: 'none',
                lg: 'none',
                xl: 'none',
              },
            }}
          >
            <MenuRounded />
          </IconButton>
          <div style={{ flexGrow: 1 }} />
          <Skeleton variant="circular" width={40} height={40} />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileMenuVisible}
          onClose={() => setMobileMenuVisible(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {
              xs: 'block',
              sm: 'none',
              md: 'none',
              lg: 'none',
              xl: 'none',
            },
          }}
        >
          <Box
            style={{
              width: '208px',
              height: '100vh',
              overflowY: 'auto',
            }}
            p={1}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Box m={1} />
            <Skeleton height={24} width="100%" />
            <Skeleton height={24} width="90%" />
            <Skeleton height={24} width="80%" />
          </Box>
        </Drawer>
        <Drawer
          variant="permanent"
          open
          PaperProps={{
            sx: {
              border: 'none',
            },
          }}
          sx={{
            display: {
              xs: 'none',
              sm: 'block',
              md: 'block',
              lg: 'block',
              xl: 'block',
            },
          }}
        >
          <Box
            style={{
              width: menuCollapsed ? '64px' : '208px',
              height: '100vh',
              overflowX: 'hidden',
            }}
            p={1}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Box m={1} />
            <Skeleton height={24} width="100%" />
            <Skeleton height={24} width="90%" />
            <Skeleton height={24} width="80%" />
          </Box>
        </Drawer>
      </nav>
      <main
        style={{
          background: theme.palette.background.paper,
          marginTop: xsDisplay ? '56px' : '64px',
          marginLeft: xsDisplay ? '0px' : menuCollapsed ? '64px' : '208px',
          width: xsDisplay
            ? '100%'
            : menuCollapsed
            ? 'calc(100% - 64px)'
            : 'calc(100% - 208px)',
          height: xsDisplay ? 'calc(100vh - 113px)' : 'calc(100vh - 64px)',
          overflowY: 'auto',
        }}
      >
        <PageLoading />
      </main>
    </>
  )
}
