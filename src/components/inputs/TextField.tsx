/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import {
    alpha,
    withStyles,
    makeStyles,

} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },

    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #B1C0CB',
        fontSize: 16,
        lineHeight: 24,
        width: '100%',
        padding: '16px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '"Mulish"',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
        '&::placeholder ': {
            color: "#B1C0CB",
        },
        '&:-ms-input-placeholder': {
            color: "#B1C0CB"
        },
        '&::-ms-input-placeholder': {
            color: "#B1C0CB"
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',

    },
    margin: {
        width: '100%',
        margin: theme.spacing(0),
    },
}));

type Props = {
    label: string;
    type?: string | undefined;
    value?: string;
    onChange?: (event: any) => void
}

export default function CustomizedInputs({ label, type = "input", value, onChange }: Props) {
    const classes = useStyles();

    return (
        <FormControl className={classes.margin}>
            <InputLabel shrink

                htmlFor="bootstrap-input"
                css={css`
            color:#43526D;      
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            
            `}
            >
                {label}
            </InputLabel>
            <BootstrapInput placeholder={label} id={label.replaceAll(' ','')} type={type} value={value} onChange={onChange} />
        </FormControl>
    )
}