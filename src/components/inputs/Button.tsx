import { withStyles, makeStyles } from '@material-ui/core/styles';
import { default as MuiButton, ButtonProps } from '@material-ui/core/Button';
import { colorCream, colorGold2, colorBrandPrimary, colorBrandPrimary2 } from 'styles/color';

type Props = {
    cream?: boolean | undefined
} & ButtonProps

export default function Button(props: Props) {

    const { cream, ...rest } = props;

    let btnStyle = cream ? 'cream' : 'default'

    const colors: { [key: string]: { [key: string]: string } } = {
        'cream': {
            'backgroundColor': colorCream,
            'backgroundColor2': colorGold2,
            'border': '1px solid #2A3612'
        },
        'default': {
            'backgroundColor': colorBrandPrimary,
            'backgroundColor2': colorBrandPrimary2,
            'border': `1px solid ${colorBrandPrimary}`
        }
    }

    const custom: { [key: string]: string } = colors[btnStyle];

    const borderStyles = {
        border: custom.border
    }

    const ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(custom.backgroundColor),
            backgroundColor: custom.backgroundColor,
            '&:hover': {
                backgroundColor: custom.backgroundColor2,
            },
            borderRadius: '4px',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '16px',
            alignItems: 'center',
            textAlign: 'center',
            letterSpacing: '0.05em',
            textTransform: 'capitalize',
            ...borderStyles,
        },
    }))(MuiButton);

    const useStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    return (
        <ColorButton className={classes.margin} {...rest} />
    );
}
