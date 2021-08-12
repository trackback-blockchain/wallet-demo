import { useHistory } from 'react-router';


import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from 'components/inputs/Button';

import './share.scss'

type Props = {
    accept: () => void;
    decline: () => void;
}

function ShareDetails({ accept, decline }: Props) {
    const history = useHistory();

    const goback = () => {
        history.goBack();
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
                    <div className="info-logo"></div>

                    <div className="info-text">Would you like to share your account information?</div>
                </div>




            </div>

            <div className="button-container">
                <Button className="button-access" onClick={accept}>
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