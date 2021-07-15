/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Button from 'components/inputs/Button';
import { default as MatrialBtn } from '@material-ui/core/Button';

import TextField from '../inputs/TextField'

import './signup.scss'
import { makeStyles } from '@material-ui/core';
import { colorBrandPrimary } from 'styles/color';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { ROUTE_LOGIN, ROUTE_ROOT } from '../../constants';
import { useDispatch } from 'react-redux';
import { updateUserData } from 'reducers/user';
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


function SignUp() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    function login() {
        history.push(ROUTE_LOGIN);
    }

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };


    const handleRegister = async () => {
        if (email.length === 0 || password.length === 0) {
            return;
        }

        await dispatch(updateUserData({ name, email, password }));
        await dispatch(changeLoggedIn(true));
        
        history.push(ROUTE_ROOT);
    };



    return (
        <div className="container-signup">

            <div className="heading">
                <h4 >Register</h4>
            </div>

            <div className="signup">
                <h4 className="color-black1" css={css`text-align:left; margin-bottom:10px`}>First things first!</h4>

                <div css={css`border: 2px solid #153144;width: 48px;height: 0px; margin-top:0 !important;`}></div>


                <div css={css` > * {
                    margin-top: 15px;
                }
                `}>

                    <TextField label="Name" value={name} onChange={handleName} />

                    <TextField label="Email address" value={email} onChange={handleEmail} />

                    <TextField label="Password" type="password" value={password} onChange={handlePassword} />

                </div>


                <Button gold className="button-continue" onClick={handleRegister}>
                    Register
                </Button>

                <MatrialBtn  className={classes.link} onClick={login}>
                    Sign in instead
                </MatrialBtn>

            </div>



        </div>
    )
}


export default SignUp