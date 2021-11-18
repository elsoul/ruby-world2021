import '@/lib/i18n'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { RelayEnvironmentProvider } from 'react-relay'
import { createEnvironment } from '@/lib/relay'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { enUS as dateEn, ja as dateJa } from 'date-fns/locale'

import AppLoading from '@/components/loading/AppLoading'
import MessageProvider from '@/components/notifier/MessageProvider'
import MessageSnackbar from '@/components/notifier/MessageSnackbar'
import { makeTheme } from '@/constants/theme'
import DefaultLayout from '@/layouts/default/DefaultLayout'
import DefaultRoute from '@/routes/DefaultRoute'
import ThemeContextProvider from '@/components/utils/ThemeContextProvider'
import useColorMode from '@/hooks/useColorMode'

function MyApp() {
  const { i18n } = useTranslation()
  const isEnglish = i18n.language === 'en-US'
  const { colorMode } = useColorMode()
  const theme = makeTheme(isEnglish, colorMode)

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={isEnglish ? dateEn : dateJa}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MessageProvider>
          <MessageSnackbar />
          <BrowserRouter>
            <Routes>
              <Route
                path="*"
                element={
                  <DefaultLayout>
                    <DefaultRoute />
                  </DefaultLayout>
                }
              />
            </Routes>
          </BrowserRouter>
        </MessageProvider>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default function App() {
  return (
    <Suspense fallback={<AppLoading />}>
      <RelayEnvironmentProvider environment={createEnvironment()}>
        <ThemeContextProvider>
          <MyApp />
        </ThemeContextProvider>
      </RelayEnvironmentProvider>
    </Suspense>
  )
}
