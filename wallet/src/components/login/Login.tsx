/** @jsxImportSource @emotion/react */
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'reducers/user';
import { changeLoggedIn } from 'reducers/app';

// @ts-ignore
import CryptoJS from 'crypto-js';

import { css } from '@emotion/react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Button from 'components/inputs/Button';

import TextField from '../inputs/TextField';
import { ROUTE_ROOT } from '../../constants';

import './login.scss';


function Login() {

    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(getUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')


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
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        
        if (!pattern.test(email)) {
            console.log("*")
            return;
        
        } else {
            console.log("INVALID")
        }

        const hash = CryptoJS.SHA256(password);

        if (user.email === email && hash.toString(CryptoJS.enc.Base64) === user.password) {
            await dispatch(changeLoggedIn(true));
            history.push(ROUTE_ROOT);
        }

    };

    const goback = () => {
        history.goBack();
    }

    return (
        <div className="container-login">
            <div className="banner">

                <IconButton aria-label="back" style={{ marginTop: 25, }} onClick={goback}>
                    <ArrowBackIcon fontSize="large" style={{ color: '#DEC058' }} />
                </IconButton>

                <div className="title">Login</div>

            </div>

            <div className="signup">

                <div css={css` > * {
                    margin-top: 15px;
                }
                `}>


                    <TextField label="Email address" value={email} onChange={handleEmail} />

                    <TextField label="Password" type="password" value={password} onChange={handlePassword} />


                </div>
                
                <Button className="button-continue" onClick={handleLogin}>
                    Login
                </Button>

            </div>

        </div>
    )
}

export default Login