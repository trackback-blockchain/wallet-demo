
import { ReactComponent as Logo } from '../logo.svg';

import './loading.scss'

function Loading() {

    return (
        <div className="container-loading">

            <div className="logo-container">
                <Logo width="77" height="77" />
            </div>
            <div className="title">Please wait...</div>
        </div>
    )

}

export default Loading