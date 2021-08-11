/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useHistory } from 'react-router';

import Button from 'components/inputs/Button';

import { ReactComponent as Layer } from '../resources/Layer_2.svg';
import { ReactComponent as Ellipse } from '../resources/Ellipse_181.svg';

import './signUpSuccess.scss';


function SignUpSuccess() {
    const history = useHistory();

    const onClick = () => {
        history.push("/");
    }

    return (
        <div className="container-sg-success">


            <div className="card">
                <div className="logo">

                    <Layer css={css`  
                        top: 18px;
                        position: absolute;
                    `} />

                    <Ellipse css={css` 
                    `} />


                </div>

                <h5>You’re in!</h5>
                <h6 className="sub">
                    Thanks for signing up! Start filling out your profile information by verifying your identity documents.
                </h6>

                <Button className="button-getstarted" onClick={onClick}>
                    Get Started
                </Button>
            </div>


        </div>
    )
}

export default SignUpSuccess
