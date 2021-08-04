import { useHistory } from 'react-router';


import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './details.scss'

function DocumentDetails() {
    const history = useHistory();

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


                <div className="title">doc details </div>

            </div>
        </div>

    )
}


export default DocumentDetails;