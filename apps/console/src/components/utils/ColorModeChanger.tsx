import { useEffect } from 'react'
import { IconButton } from '@mui/material'
import { LightModeRounded, DarkModeRounded } from '@mui/icons-material'
import useColorMode from '@/hooks/useColorMode'
import { SOULsGrey, SOULsBlue, SOULsIndigo } from '@/constants/colors'

export default function ColorModeChanger() {
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    switch (colorMode) {
      case 'light': {
        document.documentElement.style.setProperty(
          '--souls-title',
          SOULsGrey[500]
        )
        document.documentElement.style.setProperty(
          '--souls-main',
          SOULsGrey[400]
        )
        document.documentElement.style.setProperty('--souls-bg', SOULsGrey[100])
        document.documentElement.style.setProperty(
          '--souls-border',
          SOULsGrey.border
        )

        document.documentElement.style.setProperty(
          '--souls-link',
          SOULsIndigo[300]
        )
        document.documentElement.style.setProperty(
          '--souls-link-hover',
          SOULsBlue[300]
        )
        document.documentElement.style.setProperty(
          '--souls-link-visited',
          SOULsIndigo[500]
        )

        break
      }
      case 'dark': {
        document.documentElement.style.setProperty(
          '--souls-title',
          SOULsGrey.contrastText
        )
        document.documentElement.style.setProperty(
          '--souls-main',
          SOULsGrey.darkTextMain
        )
        document.documentElement.style.setProperty('--souls-bg', SOULsGrey[500])
        document.documentElement.style.setProperty(
          '--souls-border',
          SOULsGrey[400]
        )
        document.documentElement.style.setProperty(
          '--souls-link',
          SOULsBlue[200]
        )
        document.documentElement.style.setProperty(
          '--souls-link-hover',
          SOULsBlue[100]
        )
        document.documentElement.style.setProperty(
          '--souls-link-visited',
          SOULsBlue[300]
        )
        break
      }
    }
  }, [colorMode])

  return (
    <>
      <IconButton onClick={() => toggleColorMode()}>
        {colorMode === 'light' ? (
          <DarkModeRounded aria-label="DarkMode" />
        ) : (
          <LightModeRounded aria-label="LightMode" />
        )}
      </IconButton>
    </>
  )
}
