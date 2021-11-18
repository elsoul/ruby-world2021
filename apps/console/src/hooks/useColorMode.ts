import { useContext } from 'react'
import { ThemeContext } from '@/components/utils/ThemeContextProvider'

export default function useColorMode() {
  const { colorMode, toggleColorMode } = useContext(ThemeContext)
  return { colorMode, toggleColorMode }
}
