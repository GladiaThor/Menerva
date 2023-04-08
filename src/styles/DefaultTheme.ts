export const DefaultTheme = (darkMode?: boolean): {} => {
  return {
    overrides: {
      MuiButton: {
        root: {
          borderRadius: 0,
          color: '#453682',
          '&$disabled': {
            '& > span': {
              color: '#f1f1f1'
            }
          }
        },
        outlined: {
          border: '2px solid #453682'
        }
      }
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      common: {
        black: '#000',
        white: '#fff'
      },
      background: {
        paper: '#ffffff',
        default: darkMode ? '#121212' : '#ffffff'
      },
      primary: {
        dark: '#31776D',
        main: '#40A097',
        light: '#97DDD3',
        contrastText: '#ffffff'
      },
      secondary: {
        light: '#fed89d',
        main: '#ffc874',
        dark: '#efa332',
        contrastText: '#000000'
      },
      error: {
        light: '#ea787f',
        main: '#ce454d',
        dark: '#a82129',
        contrastText: '#fff'
      },
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(88, 88, 88, 0.54)',
        disabled: 'rgba(190, 190, 190, 0.38)',
        hint: 'rgba(255,255,255,0.8)'
      }
    },
    typography: {
      fontFamily: ['Montserrat', 'sans-serif'],
      h1: {
        fontWeight: 700
      },
      h2: {
        fontWeight: 700
      },
      h3: {
        fontWeight: 700
      },
      h4: {
        fontWeight: 700
      },
      h5: {
        fontWeight: 600
      },
      h6: {
        fontWeight: 600
      }
    }
  }
}
