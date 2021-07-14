
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  colorBrandPrimary,
  colorBrandSecondary
} from 'styles/color'

import './styles/App.scss'
import store from './store';
// import Splash from 'components/splash/Splash';
// import Welcome from 'components/welcome/Welcome';
// import SignUp from 'components/signup/SignUp';
import SignUpSuccess from 'components/signup/SignUpSuccess';


const theme = createTheme({
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
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <StylesProvider injectFirst>

          <SignUpSuccess />
        </StylesProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
