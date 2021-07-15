
import './welcome.scss';
import { ReactComponent as Logo } from '../logo.svg';
import Button from 'components/inputs/Button';
import { useHistory } from "react-router-dom";
import { ROUTE_LOGIN, ROUTE_REGISTER } from '../../constants';


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
            <div className="logo">
                <Logo />
            </div>

            <h4 className="heading">Welcome to the TANZ identity wallet</h4>
            <h6 className="subtitle color-grey6">
                Save time, create your identity and share it with other TANZ members
            </h6>


            <Button gold className="btn_regiester" onClick={regiester}>
                Register
            </Button>

            <Button className="btn_login" onClick={login} >
                Login
            </Button>

        </div>
    )
}

export default Welcome
