import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from "react-router-dom";

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';

import { getDocumentbyId } from 'reducers/user';
import { AppState } from 'store';

import { Document } from 'types';

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
    error: {
        marginTop: '15px',
        fontSize: 14,
        color:'#b71c1c'
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});


interface ParamTypes {
    id: string
}


function camelCaseToLetter(text: string) {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

function toFV(obj: { [key: string]: any }) {
    return Object.keys(obj).map((key: string) => {
        const value = obj[key];
        const field = camelCaseToLetter(key);

        if (typeof value !== 'string') {
            return {
                field,
                value: ""
            }
        }
        return {
            field,
            value
        }
    })
}

function docParser(doc: Document | undefined) {

    if (!doc) return []

    if (doc.type === "DigitalPassportCredential") {
        const obj = doc.vcs?.vc?.credentialSubject?.passport?.traveller;
        return toFV(obj);
    }

    if (doc.type === "DigitalDriverLicenceCredential") {
        const obj = doc.vcs?.vc?.credentialSubject;
        return toFV(obj);
    }

    if (doc.type === "DigitalDriverLicenceCredentialTrackback") {
        const obj = doc.vcs?.vc?.credentialSubject;
        return toFV(obj);
    }

    return []

}


function DocumentDetails() {
    const classes = useStyles();
    const history = useHistory();
    let { id } = useParams<ParamTypes>();
    const doc = useSelector((state: AppState) => getDocumentbyId(state, id));

    const goback = () => {
        history.goBack();
    }

    const fields = docParser(doc);



    return (
        <div className="container-doc-detail">

            <div className="banner">

                <div className="back-btn-container">
                    <IconButton aria-label="back" onClick={goback}>
                        <ArrowBackIcon fontSize="large" style={{ color: '#DEC058' }} />
                    </IconButton>

                    <div className="back-title">Document details</div>

                </div>

                <div className="title">{doc?.name}</div>

            </div>

            <div className="page-container">
                <Card className={classes.root}>
                    <CardContent>

                        {
                            fields.map(({ field, value }) => {
                                if (field === 'Id') {
                                    return <></>
                                }
                                if (field === 'Image Hash') {
                                    return <></>
                                }
                                if (field === 'Image Uri') {
                                    return <>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Photo
                                        </Typography>
                                        <CardMedia
                                            className={classes.media}
                                            image={value}
                                            title="Photo"
                                        />

                                    </>
                                }

                                return (
                                    <>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            {field}
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {value}
                                        </Typography>
                                    </>
                                )
                            })
                        }


                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {doc?.didUri}
                        </Typography>

                        {doc?.verificationFailed && <Typography className={classes.error} color="textSecondary" gutterBottom>
                            Verification Failed
                        </Typography>}

                    </CardContent>
                </Card>

            </div>
        </div>
    )
}


export default DocumentDetails;
