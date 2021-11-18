import { Box, Container, Toolbar } from '@mui/material'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import LogoHorizontal from '@/assets/img/logo/logo-horizontal.svg'
import LogoHorizontalWhite from '@/assets/img/logo/logo-horizontal-white.svg'

import LanguageChanger from '@/components/switch/LanguageChanger'
import ColorModeChanger from '@/components/utils/ColorModeChanger'
import useColorMode from '@/hooks/useColorMode'
import { useNavigate } from 'react-router'

export default function DefaultHeader() {
  const { colorMode } = useColorMode()
  const navigate = useNavigate()
  return (
    <>
      <Container maxWidth="lg">
        <Box py={2}>
          <Toolbar>
            <Box
              onClick={() => {
                navigate('/')
              }}
              style={{ cursor: 'pointer' }}
            >
              <LazyLoadImage
                width="112"
                height="32"
                src={
                  colorMode === 'light' ? LogoHorizontal : LogoHorizontalWhite
                }
                alt="Logo"
                effect="opacity"
              />
            </Box>
            <div style={{ flexGrow: 1 }} />
            <LanguageChanger />
            <ColorModeChanger />
          </Toolbar>
        </Box>
      </Container>
    </>
  )
}
