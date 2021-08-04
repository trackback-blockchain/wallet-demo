
import { useHistory } from "react-router-dom";

import Button from 'components/inputs/Button';

import { ROUTE_LOGIN, ROUTE_REGISTER } from '../../constants';
import { ReactComponent as Logo } from '../logo.svg';

import './welcome.scss';

function Welcome() {
    const history = useHistory();

    function login() {
        history.push(ROUTE_LOGIN);
    }
    function regiester() {
        history.push(ROUTE_REGISTER);
    }

    return (
        <div className="container-welcome">
            <div className="banner">
                <div className="logo">
                    <Logo width="66" height="66" />
                </div>

                <h4 className="heading">Welcome to the TANZ wallet.</h4>
            </div>

            <Button className="btn_register" onClick={regiester}>
                Register
            </Button>

            <Button cream className="btn_login" onClick={login} >
                Login
            </Button>

        </div>
    )
}

export default Welcome
