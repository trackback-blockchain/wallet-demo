/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Button from 'components/inputs/Button';
import './signUpSuccess.scss';
import { ReactComponent as Check } from '../resources/check.svg';
import { ReactComponent as Layer } from '../resources/Layer_2.svg';
import { ReactComponent as Ellipse } from '../resources/Ellipse_181.svg';
import { ReactComponent as Ellipse2 } from '../resources/Ellipse_182.svg';



function SignUpSuccess() {

    return (
        <div className="container-sg-success">


            <div className="card">
                <div className="logo">

                    <Layer css={css`  
                        top: 18px;
                        position: absolute;
                    `} />

                    <Ellipse2 css={css`  
                        position: absolute;
                        right: 168px;
                    `} />
               
       <Check css={css`  
                        position: absolute;
                        right: 176px;
                        top: 10px;
                    `} />
                    <Ellipse css={css` 
                    `} />

             
                </div>

                <h5>Welcome to TANZ</h5>
                <h6 className="sub">
                    Thanks for signing up! Start filling out your profile information by verifying your license.
                </h6>

                <Button gold className="button-getstarted" >
                    Get Started
                </Button>
            </div>


        </div>
    )
}

export default SignUpSuccess
