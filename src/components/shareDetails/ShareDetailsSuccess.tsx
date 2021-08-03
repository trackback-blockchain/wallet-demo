/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Button from 'components/inputs/Button';
import { ReactComponent as Layer } from '../resources/Layer_2.svg';
import { ReactComponent as Ellipse } from '../resources/Ellipse_181.svg';

import './shareSuccess.scss';


function ShareDetailsSuccess() {

    return (
        <div className="container-share-success">


            <div className="card">
                <div className="logo">

                    <Layer css={css`  
                        top: 18px;
                        position: absolute;
                    `} />

                    <Ellipse css={css` 
                    `} />


                </div>

                <h5>Access granted</h5>
                <h6 className="sub">
                    Thanks for signing up! Start filling out your profile information by verifying your identity documents.
                </h6>

                <Button className="button-getstarted" >
                    Okay
                </Button>
            </div>


        </div>
    )
}

export default ShareDetailsSuccess;