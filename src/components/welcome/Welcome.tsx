
import './welcome.scss';
import { ReactComponent as Logo } from '../logo.svg';
import Button from 'components/inputs/Button';

function Welcome() {

    return (
        <div className="container">
            <div className="logo">
                <Logo />
            </div>

            <h4 className="heading">Welcome to the TANZ identity wallet</h4>
            <h6 className="subtitle color-grey6">
                Save time, create your identity and share it with other TANZ members
            </h6>


            <Button gold className="btn_regiester" >
                Register
            </Button>

            <Button className="btn_login" >
                Login
            </Button>

        </div>
    )
}

export default Welcome
