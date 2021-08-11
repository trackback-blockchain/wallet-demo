import { useHistory } from 'react-router';
import { useParams } from "react-router-dom";

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './details.scss'
import { getDocumentbyId } from 'reducers/user';
import { AppState } from 'store';
import { useSelector } from 'react-redux';

interface ParamTypes {
    id: string
}

function DocumentDetails() {
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
        </div>

    )
}


export default DocumentDetails;