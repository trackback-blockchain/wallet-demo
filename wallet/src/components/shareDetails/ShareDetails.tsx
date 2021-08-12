import { useHistory } from 'react-router';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';

import Button from 'components/inputs/Button';

import './share.scss'

type Props = {
    accept: (p: { [key: string]: boolean }) => void;
    decline: () => void;
}

const useStyles = makeStyles({
    root: {
        margin: 22,
        marginBottom: 0,
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginTop: '15px',
        // fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


function ShareDetails({ accept, decline }: Props) {
    const history = useHistory();
    const classes = useStyles();

    const [shareBloodType, setFull] = useState(true);

    const goback = () => {
        history.goBack();
    }

    const handleChange = () => {
        setFull(!shareBloodType);
    }

    const onAcceptClick = () => {
        accept({ givenName: true, familyName: true, bloodType: shareBloodType })
    }

    return (
        <div className="container-share-detail">

            <div className="banner">

                <div className="back-btn-container">
                    <IconButton aria-label="back" onClick={goback}>
                        <ArrowBackIcon fontSize="large" style={{ color: '#DEC058' }} />
                    </IconButton>

                    <div className="back-title">Grant Access</div>

                </div>


                <div className="info">
                    <div className="info-text">Would you like to share following information?</div>
                </div>

            </div>

            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} gutterBottom>

                        Given Name

                    </Typography>


                    <Typography className={classes.title} gutterBottom>

                        Family Name

                    </Typography>


                    <Typography className={classes.title}  component="div">
                        <span>Blood Type</span>
                        <Switch

                            checked={shareBloodType}
                            onChange={handleChange}

                            name="checkedB"

                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />

                    </Typography>

                </CardContent>
            </Card>

            <div className="button-container">
                <Button className="button-access" onClick={onAcceptClick}>
                    Grant access
                </Button>
                <Button cream className="button-access" onClick={decline}>
                    Deny access
                </Button>

            </div>

        </div>

    )
}


export default ShareDetails;