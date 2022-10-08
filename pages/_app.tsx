import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import PersistentDrawerLeft from '../src/components/side-drawer'
import theme from '../src/styles/theme'
import { store } from '../src/app/store'
import { Provider } from 'react-redux'
import { GlobalStyles } from '@mui/material'

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{ body: { backgroundColor: 'red' } }} />
        <PersistentDrawerLeft>
          <Component {...pageProps} />
        </PersistentDrawerLeft>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
