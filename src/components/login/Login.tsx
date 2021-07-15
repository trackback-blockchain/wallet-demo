/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Button from 'components/inputs/Button';
import { default as MatrialBtn } from '@material-ui/core/Button';

import TextField from '../inputs/TextField';

import './login.scss';
import { makeStyles } from '@material-ui/core';
import { colorBrandPrimary } from 'styles/color';
import { useHistory } from "react-router-dom";
import { ROUTE_REGISTER, ROUTE_ROOT } from '../../constants';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'reducers/user';

// @ts-ignore
import CryptoJS from 'crypto-js';
import { changeLoggedIn } from 'reducers/app';


const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',

    },
    link: {
        letterSpacing: '0.05em',
        textDecorationLine: 'underline',
        textTransform: 'capitalize',
        width: '100%',
        color: colorBrandPrimary,
    }
}));


function Login() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(getUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    function regiester() {
        history.push(ROUTE_REGISTER);
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {

        if (email.length === 0 || password.length === 0) {
            return;
        }

        const hash = CryptoJS.SHA256(password);

        if (user.email === email && hash.toString(CryptoJS.enc.Base64) === user.password) {
            await dispatch(changeLoggedIn(true));
            history.push(ROUTE_ROOT);
        }

    };

    return (
        <div className="container-login">

            <div className="heading">
                <h4 >Login</h4>
            </div>

            <div className="signup">

                <div css={css` > * {
                    margin-top: 15px;
                }
                `}>


                    <TextField label="Email address" value={email} onChange={handleEmail} />

                    <TextField label="Password" type="password" value={password} onChange={handlePassword} />


                </div>


                <Button gold className="button-continue" onClick={handleLogin} >
                    Login
                </Button>

                <MatrialBtn className={`${classes.link} button-register`} onClick={regiester}>
                    Register
                </MatrialBtn>

            </div>



        </div>
    )
}


export default Login