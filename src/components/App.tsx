
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles'

import {
  colorBrandPrimary,
  colorBrandSecondary
} from 'style/color'

import store from '../store';


const theme = createMuiTheme({
  typography: {
    fontFamily: '"Mulish", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      // light: blue.A200,
      main: colorBrandPrimary,
      // dark: blue.A700,
    },
    secondary: {
      // light: green.A200,
      main: colorBrandSecondary,
      // dark: green.A700,
    },
  },
})


function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>

          <div>hello</div>
          
        </StylesProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
