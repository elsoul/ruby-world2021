import type { ReactNode } from 'react'
import { createContext, useCallback, useState } from 'react'

type ColorMode = 'light' | 'dark'

type ThemeContextType = {
  colorMode: ColorMode
  toggleColorMode: () => void
}

const defaultContext: ThemeContextType = {
  colorMode: 'light',
  toggleColorMode: () => {},
}

export const ThemeContext = createContext<ThemeContextType>(defaultContext)

type Props = {
  children: ReactNode
}

export default function ThemeContextProvider({ children }: Props) {
  const [colorMode, setColorMode] = useState<ColorMode>('light')
  const toggleColorMode = useCallback(() => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light')
  }, [colorMode, setColorMode])

  const contextValue = {
    colorMode,
    toggleColorMode,
  }

  return (
    <>
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    </>
  )
}
