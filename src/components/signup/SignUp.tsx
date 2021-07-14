/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Button from 'components/inputs/Button';
import { default as MatrialBtn } from '@material-ui/core/Button';

import TextField from '../inputs/TextField'

import './signup.scss'
import { makeStyles } from '@material-ui/core';
import { colorBrandPrimary } from 'styles/color';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      
    },
    link : {
        letterSpacing: '0.05em',
        textDecorationLine: 'underline',
        textTransform: 'capitalize',
        width:'100%',   
        color: colorBrandPrimary,  
    }
}));


function SignUp() {
    const classes = useStyles();


    return (
        <div className="container">

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

                    <TextField label="Name" />

                    <TextField label="Email address" />

                    <TextField label="Password"  type="password"/>

                </div>


                <Button gold className="button-continue" >
                    Continue
                </Button>

                <MatrialBtn href="#text-buttons" className={classes.link}>
                    Sign in instead
                </MatrialBtn>

            </div>



        </div>
    )
}


export default SignUp