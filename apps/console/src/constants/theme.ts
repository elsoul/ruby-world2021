import {
  SOULsBlue,
  SOULsRed,
  SOULsYellow,
  SOULsGreen,
  SOULsIndigo,
  SOULsGrey,
} from '@/constants/colors'
import { jaJP, enUS } from '@mui/material/locale'
import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

export const makeTheme = (isEnglish: boolean, mode: 'light' | 'dark') =>
  createTheme(
    {
      breakpoints: {
        values: {
          xs: 0,
          sm: 632,
          md: 896,
          lg: 1152,
          xl: 1440,
        },
      },
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              primary: {
                light: SOULsIndigo[200],
                main: SOULsIndigo[300],
                dark: SOULsIndigo[400],
                contrastText: SOULsIndigo.contrastText,
              },
              secondary: {
                light: SOULsGrey[200],
                main: SOULsGrey[400],
                dark: SOULsGrey[500],
                contrastText: SOULsGrey.contrastText,
              },
              error: {
                light: SOULsRed[200],
                main: SOULsRed[300],
                dark: SOULsRed[400],
                contrastText: SOULsRed.contrastText,
              },
              warning: {
                light: SOULsYellow[200],
                main: SOULsYellow[300],
                dark: SOULsYellow[400],
                contrastText: SOULsYellow.contrastText,
              },
              info: {
                light: SOULsBlue[200],
                main: SOULsBlue[300],
                dark: SOULsBlue[400],
                contrastText: SOULsBlue.contrastText,
              },
              success: {
                light: SOULsGreen[200],
                main: SOULsGreen[300],
                dark: SOULsGreen[400],
                contrastText: SOULsGreen.contrastText,
              },
              text: {
                primary: SOULsGrey[400],
                secondary: SOULsGrey[200],
              },
              background: {
                default: '#FFFFFF',
              },
            }
          : {
              primary: {
                light: SOULsBlue[100],
                main: SOULsBlue[200],
                dark: SOULsBlue[300],
                contrastText: SOULsGrey[500],
              },
              secondary: {
                light: grey[50],
                main: grey[100],
                dark: grey[200],
                contrastText: SOULsGrey[500],
              },
              error: {
                light: SOULsRed[100],
                main: SOULsRed[200],
                dark: SOULsRed[300],
                contrastText: SOULsGrey[500],
              },
              warning: {
                light: SOULsYellow[100],
                main: SOULsYellow[200],
                dark: SOULsYellow[300],
                contrastText: SOULsGrey[500],
              },
              info: {
                light: SOULsBlue[100],
                main: SOULsBlue[200],
                dark: SOULsBlue[300],
                contrastText: SOULsGrey[500],
              },
              success: {
                light: SOULsGreen[100],
                main: SOULsGreen[200],
                dark: SOULsGreen[300],
                contrastText: SOULsGrey[500],
              },
              background: {
                default: '#121212',
              },
            }),
      },
      typography: {
        fontFamily: `
          -apple-system,
          BlinkMacSystemFont,
          "Helvetica Neue",
          "Hiragino Sans" ,
          "Hiragino Kaku Gothic ProN",
          "Segoe UI",
          "BIZ UDPGothic",
          "Noto Sans",
          "Yu Gothic UI",
          Roboto,
          Arial,
          sans-serif,
          "Apple Color Emoji",
          "Noto Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol";`,
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
          fontWeight: 700,
          fontSize: '2.66667rem',
          letterSpacing: 'normal',
          lineHeight: 1.14286,
        },
        h2: {
          fontWeight: 700,
          fontSize: '2rem',
          letterSpacing: 'normal',
          lineHeight: 1.167,
        },
        h3: {
          fontWeight: 700,
          fontSize: '1.6rem',
          letterSpacing: 'normal',
          lineHeight: 1.2,
        },
        h4: {
          fontWeight: 700,
          fontSize: '1.33333rem',
          letterSpacing: 'normal',
          lineHeight: 1.235,
        },
        h5: {
          fontWeight: 700,
          fontSize: '1.14286rem',
          letterSpacing: 'normal',
          lineHeight: 1.33333,
        },
        h6: {
          fontWeight: 700,
          fontSize: '1rem',
          letterSpacing: 'normal',
          lineHeight: 1.6,
        },
        subtitle1: {
          fontWeight: 500,
          fontSize: '1.33333rem',
          letterSpacing: 'normal',
          lineHeight: 1.33333,
        },
        subtitle2: {
          fontWeight: 500,
          fontSize: '1.14286rem',
          letterSpacing: 'normal',
          lineHeight: 1.6,
        },
        body1: {
          fontWeight: 500,
          fontSize: '1rem',
          letterSpacing: 'normal',
          lineHeight: 1.6,
        },
        body2: {
          fontWeight: 500,
          fontSize: '0.88889rem',
          letterSpacing: 'normal',
          lineHeight: 1.75,
        },
        button: {
          fontWeight: 700,
          fontSize: '0.88889rem',
          textTransform: 'none',
          letterSpacing: 'normal',
          lineHeight: 1.75,
        },
        caption: {
          fontWeight: 400,
          fontSize: '0.8rem',
          letterSpacing: 'normal',
          lineHeight: 1.33333,
        },
        overline: {
          fontWeight: 500,
          fontSize: '0.8rem',
          textTransform: 'none',
          letterSpacing: 'normal',
          lineHeight: 2.66667,
        },
      },
      shape: {
        borderRadius: 12,
      },
      shadows: [
        'none',
        'rgb(169 174 183 / 50%) 0px 1px 2px 0px',
        'rgb(169 174 183 / 50%) 0px 2px 3px 0px',
        'rgb(169 174 183 / 50%) 0px 3px 5px 0px',
        'rgb(169 174 183 / 50%) 0px 4px 6px 0px',
        'rgb(169 174 183 / 50%) 0px 5px 8px 0px',
        'rgb(169 174 183 / 50%) 0px 6px 9px 0px',
        'rgb(169 174 183 / 50%) 0px 7px 11px 0px',
        'rgb(169 174 183 / 50%) 0px 8px 13px 0px',
        'rgb(169 174 183 / 50%) 0px 9px 14px 0px',
        'rgb(169 174 183 / 50%) 0px 10px 16px 0px',
        'rgb(169 174 183 / 50%) 0px 11px 18px 0px',
        'rgb(169 174 183 / 50%) 0px 12px 20px 0px',
        'rgb(169 174 183 / 50%) 0px 13px 21px 0px',
        'rgb(169 174 183 / 50%) 0px 14px 22px 0px',
        'rgb(169 174 183 / 50%) 0px 15px 23px 0px',
        'rgb(169 174 183 / 50%) 0px 16px 24px 0px',
        'rgb(169 174 183 / 50%) 0px 17px 26px 0px',
        'rgb(169 174 183 / 50%) 0px 18px 28px 0px',
        'rgb(169 174 183 / 50%) 0px 19px 29px 0px',
        'rgb(169 174 183 / 50%) 0px 20px 32px 0px',
        'rgb(169 174 183 / 50%) 0px 21px 34px 0px',
        'rgb(169 174 183 / 50%) 0px 22px 36px 0px',
        'rgb(169 174 183 / 50%) 0px 23px 38px 0px',
        'rgb(169 174 183 / 50%) 0px 24px 40px 0px',
      ],
    },
    isEnglish ? enUS : jaJP
  )
