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

import { getVcpRequest } from 'reducers/app';
import { useSelector } from 'react-redux';
import { getDocumentbyType } from 'reducers/user';
import { AppState } from 'store';

import './share.scss'

type Props = {
    accept: (p: any) => void;
    decline: () => void;
}

const useStyles = makeStyles({
    root: {
        margin: 22,
        marginBottom: 0,
        minWidth: 275,
        minHeight: 300,

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginTop: '10px',
        // fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function camelCaseToLetter(text: string) {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

function ShareDetails({ accept, decline }: Props) {
    const history = useHistory();
    const classes = useStyles();
    const vcpRequest = useSelector(getVcpRequest);

    const type = vcpRequest?.schema?.vc;
    const properties = vcpRequest?.schema?.properties || {};
    const required = vcpRequest?.schema?.required || [];

    const keys = Object.keys(properties);

    const doc = useSelector((state: AppState) => getDocumentbyType(state, type));

    const [sharing, setSharing] = useState<{ [key: string]: boolean }>({});

    const goback = () => {
        history.goBack();
    }

    const handleChange = (key: string, isSharing: boolean) => {
        setSharing({ ...sharing, [key]: isSharing })
    }

    const onAcceptClick = () => {
        const vsMap = keys.map((key) => {
            const isRequired = required.includes(key);

            const vc = doc?.vcs.partialVCS.find((vc) => {

                if (type === "DigitalPassportCredential") {
                    return !!vc?.credentialSubject?.passport?.traveller[key];
                }
                if (type === "DigitalDriverLicenceCredential") {
                    return !!vc?.credentialSubject[key];
                }
                if (type === "DigitalDriverLicenceCredentialTrackback") {
                    return !!vc?.credentialSubject[key];
                }

                return false;
            })

            return isRequired ? vc : (sharing[key] ? vc : null)
        })

        console.log(Object.values(vsMap).filter(a => a !== null))

        accept(Object.values(vsMap).filter(a => a !== null))
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
                    <div className="info-text">Would you like to share following information from {doc?.name}?</div>
                </div>

            </div>

            <Card className={classes.root}>
                <CardContent>

                    {keys.map((key) => {

                        const isRequired = required.includes(key);

                        const vc = doc?.vcs.partialVCS.find((vc) => {
                            if (type === "DigitalPassportCredential") {
                                return !!vc?.credentialSubject?.passport?.traveller[key];
                            }
                            if (type === "DigitalDriverLicenceCredential") {
                                return !!vc?.credentialSubject[key];
                            }
                            if (type === "DigitalDriverLicenceCredentialTrackback") {
                                return !!vc?.credentialSubject[key];
                            }
                            return false;
                        })
                        if (!vc) return <div key={key}></div>

                        return (<div key={key} >
                            <Typography className={classes.title} gutterBottom >

                                {camelCaseToLetter(key)}


                                {!isRequired && <Switch

                                    checked={!!sharing[key]}
                                    onChange={() => {
                                        handleChange(key, !sharing[key])
                                    }}

                                    name={key}

                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />}

                            </Typography>
                        </div>)

                    })}

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