/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Button from 'components/inputs/Button';
import { ReactComponent as Layer } from '../resources/Layer_2.svg';
import { ReactComponent as Ellipse } from '../resources/Ellipse_181.svg';

import './shareSuccess.scss';

type Props = {
    accept: () => void
}
function ShareDetailsFailed({ accept }: Props) {

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

                <h5>Credentials not verified</h5>

                <Button className="button-getstarted" onClick={accept}>
                    Continue
                </Button>
            </div>


        </div>
    )
}

export default ShareDetailsFailed;