
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline';


import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_QR_CODE, ROUTE_REGISTER, ROUTE_SHARE, ROUTE_SHARING, ROUTE_SUCCESS, ROUTE_VC, ROUTE_WELCOME } from './constants';

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

              <PrivateRoute exact path={ROUTE_SUCCESS} component={SignUpSuccess} />
              <PrivateRoute exact path={ROUTE_HOME} component={Home} />
              <PrivateRoute exact path={ROUTE_QR_CODE} component={QRCode} />
              <PrivateRoute exact path={ROUTE_VC} component={DocumentDetails} />
              <PrivateRoute exact path={ROUTE_SHARE} component={ShareDetails} />
              <PrivateRoute exact path={ROUTE_SHARING} component={SharingAccess} />

              <PrivateRoute exact path="/" component={Home} />

            </Switch>
          </BrowserRouter>
        </SubstrateContextProvider>
      </StylesProvider>
    </ThemeProvider>

  );
}

export default App;
