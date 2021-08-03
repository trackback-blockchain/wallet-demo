
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline';


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
import DocumentDetails from 'components/documentDetails/DocumentDetails';
import ShareDetails from 'components/shareDetails/ShareDetails';
import SharingAccess from 'components/shareDetails/SharingAccess';

import { SubstrateContextProvider } from 'components/substrateContext/SubstrateContext'


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

    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <StylesProvider injectFirst>
        <SubstrateContextProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path={ROUTE_LOGIN} component={Login} />
              <Route exact path={ROUTE_REGISTER} component={SignUp} />
              <Route exact path={ROUTE_WELCOME} component={Welcome} />
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/qr" component={QRCode} />
              <PrivateRoute exact path="/document" component={DocumentDetails} />
              <PrivateRoute exact path="/share" component={ShareDetails} />
              <PrivateRoute exact path="/sharing" component={SharingAccess} />

              <PrivateRoute exact path="/" component={SignUpSuccess} />

            </Switch>
          </BrowserRouter>
        </SubstrateContextProvider>
      </StylesProvider>
    </ThemeProvider>

  );
}

export default App;
