import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { default as MuiTabs } from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import { ReactComponent as Cog } from '../resources/cog.svg';
import { ReactComponent as QrCode } from '../resources/qrcode.svg';
import { colorGold } from 'styles/color';
import { ROUTE_QR_CODE, ROUTE_HOME } from "../../constants/index";


const useStyles = makeStyles({
    root: {
        // flexGrow: 1,
        // maxWidth: 500,
    },
    indicator: {
        backgroundColor: colorGold
    }
});

export type TabsProps = {
    tab: number

}

function Tabs(props: TabsProps) {
    const history = useHistory();

    const classes = useStyles();
    const { tab: value } = props;

    const handleChange = (__event: any, newValue: number) => {
        switch (newValue) {
            case 0:
                history.push(ROUTE_HOME);
                break;
            case 1:
                history.push(ROUTE_QR_CODE);
                break;

            default:
                break;
        }

    };


    return (
        <Paper square className={classes.root}>
            <MuiTabs
                value={value}
                variant="fullWidth"
                indicatorColor="primary"
                onChange={handleChange}
                textColor="primary"
                aria-label="tabs"
                classes={{
                    indicator: classes.indicator
                }}
            >
                <Tab icon={<PersonOutlineIcon />} aria-label="person" />
                <Tab icon={<QrCode />} aria-label="qrcode" />
                <Tab icon={<Cog />} aria-label="settings" />
            </MuiTabs>
        </Paper>
    )
}



export default Tabs;