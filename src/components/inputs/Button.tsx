import { withStyles, makeStyles } from '@material-ui/core/styles';
import { default as MuiButton, ButtonProps } from '@material-ui/core/Button';
import { colorGold, colorGold2, colorBrandPrimary, colorBrandPrimary2 } from 'styles/color';

type Props = {
    gold?: boolean | undefined
} & ButtonProps

export default function Button(props: Props) {

    const { gold, ...rest } = props;

    const color = gold ? colorGold : colorBrandPrimary;
    const color2 = gold ? colorGold2 : colorBrandPrimary2;

    const borderStyles = gold ? {} : {
        border: '1px solid #DEC058',
        borderRadius: '4px'
    }

    const ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(color),
            backgroundColor: color,
            '&:hover': {
                backgroundColor: color2,
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
