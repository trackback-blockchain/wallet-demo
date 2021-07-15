
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
import Welcome from 'components/welcome/Welcome';
import SignUp from 'components/signup/SignUp';
import Login from 'components/login/Login';
import SignUpSuccess from 'components/signup/SignUpSuccess';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { history } from './_helpers';
import PrivateRoute from 'components/PrivateRoute';
import { ROUTE_LOGIN, ROUTE_REGISTER, ROUTE_WELCOME } from './constants';


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

          <BrowserRouter>
            <Switch>
              <Route exact path={ROUTE_LOGIN} component={Login} />
              <Route exact path={ROUTE_REGISTER} component={SignUp} />
              <Route exact path={ROUTE_WELCOME} component={Welcome} />
              <PrivateRoute exact path="/" component={SignUpSuccess} />

            </Switch>
          </BrowserRouter>
        </StylesProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
