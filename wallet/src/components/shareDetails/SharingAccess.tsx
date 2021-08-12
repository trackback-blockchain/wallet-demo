
import { ReactComponent as Logo } from '../logo.svg';

import './sharingAccess.scss'

function SharingAccess() {

    return (
        <div className="container-sharing-access">

            <div className="logo-container">
                <Logo width="77" height="77" />
                {/* <div className="dots"></div>
                <div className="logo"></div> */}
            </div>
            <div className="title">Granting access...</div>
            <div className="sub-title">Please wait while we process your information. This usually takes less than 10 seconds.</div>


        </div>
    )

}

export default SharingAccess