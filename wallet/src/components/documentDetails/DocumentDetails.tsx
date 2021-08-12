import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from "react-router-dom";

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { getDocumentbyId } from 'reducers/user';
import { AppState } from 'store';

import './details.scss'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginTop: '15px',
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


interface ParamTypes {
    id: string
}

function DocumentDetails() {
    const classes = useStyles();
    const history = useHistory();
    let { id } = useParams<ParamTypes>();
    const doc = useSelector((state: AppState) => getDocumentbyId(state, id));

    const goback = () => {
        history.goBack();
    }



    return (
        <div className="container-doc-detail">

            <div className="banner">

                <div className="back-btn-container">
                    <IconButton aria-label="back" onClick={goback}>
                        <ArrowBackIcon fontSize="large" style={{ color: '#DEC058' }} />
                    </IconButton>

                    <div className="back-title">Document details</div>

                </div>


                <div className="title">{doc?.title}</div>

            </div>
            <div className="page-container">
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>

                            Given Name

                        </Typography>
                        <Typography variant="h5" component="h2">
                            {doc?.vc?.credentialSubject.passport?.traveler?.givenName}
                        </Typography>

                        <Typography className={classes.title} color="textSecondary" gutterBottom>

                            Family Name

                        </Typography>
                        <Typography variant="h5" component="h2">
                            {doc?.vc?.credentialSubject.passport?.traveler?.familyName}
                        </Typography>

                        <Typography className={classes.title} color="textSecondary" gutterBottom>

                            Blood Type

                        </Typography>
                        <Typography variant="h5" component="h2">
                            {doc?.vc?.credentialSubject.passport?.traveler?.bloodType}
                        </Typography>
                    </CardContent>
                </Card>

            </div>
        </div>

    )
}


export default DocumentDetails;