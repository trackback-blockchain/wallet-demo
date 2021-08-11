/** @jsxImportSource @emotion/react */
import { useState } from 'react';

import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { updateUserData } from 'reducers/user';
import { changeLoggedIn } from 'reducers/app';

// import { makeStyles } from '@material-ui/core';
// import { default as MatrialBtn } from '@material-ui/core/Button';
import Button from 'components/inputs/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import TextField from '../inputs/TextField'
import { ROUTE_SUCCESS } from '../../constants';

import { css } from '@emotion/react';
import './signup.scss'

import VerifiableCredentialUtil from 'utils/VerifiableCredentialUtil';
import { VerifiableCredential, VerifiableCredentialPresentation } from 'types';
// @ts-ignore
import { generateKeyPair, GenerateKeyPairResult } from 'jose/dist/browser/util/generate_key_pair'
import { KeyObject } from 'crypto';
// @ts-ignore
import CryptoJS from 'crypto-js';

function SignUp() {
   
    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
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

        const hash = CryptoJS.SHA256(password);

        const keyPair: GenerateKeyPairResult = await generateKeyPair('EdDSA');
        const publicKey = (keyPair.publicKey as KeyObject).export({ format: 'der', type: 'spki' }).toString('base64');
        const privateKey = (keyPair.privateKey as KeyObject).export({ format: 'der', type: 'pkcs8' }).toString('base64');

        const vc: VerifiableCredential = await VerifiableCredentialUtil.createCredential(name, lastName);

        const vpc: VerifiableCredentialPresentation = await VerifiableCredentialUtil.createPresentation(vc, (keyPair.privateKey as KeyObject), (keyPair.publicKey as KeyObject));


        await dispatch(updateUserData({ name, lastName, email, password: hash.toString(CryptoJS.enc.Base64), vc, vpc, publicKey, privateKey }));
        await dispatch(changeLoggedIn(true));

        history.push(ROUTE_SUCCESS);
    };

    const goback = ()=>{
        history.goBack();
    }



    return (
        <div className="container-signup">

            <div className="banner">

                <IconButton aria-label="back" style={{ marginTop: 25, }} onClick={goback}>
                    <ArrowBackIcon fontSize="large" style={{ color: '#DEC058' }} />
                </IconButton>

                <div className="title">Sign up</div>

            </div>

            <div className="signup">

                <div css={css` > * {
                    margin-top: 15px;
                }
                `}>
                    <div className="name_holder">
                        <TextField label="First Name" value={name} onChange={handleName} />
                        <TextField label="Last Name" value={lastName} onChange={handleLastName} />
                    </div>


                    <TextField label="Email address" value={email} onChange={handleEmail} />

                    <TextField label="Password" type="password" value={password} onChange={handlePassword} />

                </div>


                <Button className="button-continue" onClick={handleRegister}>
                    Continue
                </Button>

            </div>

        </div>
    )
}


export default SignUp