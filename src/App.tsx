
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { keyring } from '@polkadot/ui-keyring';

import { createTheme, ThemeProvider } from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline';

import store from './store';
import { ROUTE_LOGIN, ROUTE_REGISTER, ROUTE_WELCOME } from './constants';

import Welcome from 'components/welcome/Welcome';
import SignUp from 'components/signup/SignUp';
import Login from 'components/login/Login';
import SignUpSuccess from 'components/signup/SignUpSuccess';
import PrivateRoute from 'components/PrivateRoute';

import {
  colorBrandPrimary,
  colorBrandSecondary
} from 'styles/color'

import './styles/App.scss';
import Home from 'components/home/Home';
import QRCode from 'components/qucode/QRCode';

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

function isKeyringLoaded () {
  try {
    return !!keyring.keyring;
  } catch {
    return false;
  }
}


isKeyringLoaded() || keyring.loadAll({ ss58Format: 42, type: 'sr25519' });

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
              <Route exact path="/home" component={Home} />
              <Route exact path="/qr" component={QRCode} />

              <PrivateRoute exact path="/" component={SignUpSuccess} />

            </Switch>
          </BrowserRouter>
        </StylesProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
