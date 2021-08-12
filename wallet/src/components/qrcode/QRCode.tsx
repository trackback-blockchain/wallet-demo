/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// @ts-ignore
import QrReader from 'react-qr-reader'

import Tabs from 'components/pageComponents/Tabs';
import ShareDetails from 'components/shareDetails/ShareDetails';

import { isSharingVCP, setVCPIsSharing, shareCredentials } from 'reducers/app';
import { getDocuments } from 'reducers/user';

import SharingAccess from 'components/shareDetails/SharingAccess';
import ShareDetailsSuccess from 'components/shareDetails/ShareDetailsSuccess';

import './qrcode.scss';

function validateUrl(value: string) {
    return /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi.test(value);
}

const MODES_QR = 'MODES_QR';
const MODES_QUESTION = 'MODES_QUESTION';
const MODES_SHARING = 'MODES_SHARING';
const MODES_END = 'MODES_END';

function QRCode() {

    const [mode, setMode] = useState<string>(MODES_QR);
    const [url, setUrl] = useState('');
    const dispatch = useDispatch();
    const documents = useSelector(getDocuments);
    const isSharing = useSelector(isSharingVCP);


    useEffect(() => {

        if (!isSharing && mode === MODES_SHARING) {
            setMode(MODES_END)
        }

    }, [isSharing, mode]);

    const handleScan = async (data: any) => {

        setUrl(data);

        if (validateUrl(data)) {
            setMode(MODES_QUESTION);
        }
    }

    const handleError = (err: any) => {
        console.error(err)
    }

    const shareAccess = (sharing: { [key: string]: boolean }) => {
        if (!documents) {
            setMode(MODES_QR);
            return;
        };

        const doc = documents[0];

        if (validateUrl(url)) {
            dispatch(setVCPIsSharing(true));

            const vcp = sharing.bloodType ? doc.vcpFull : doc.vcp;

            if (!vcp) return;
            setMode(MODES_SHARING);

            dispatch(shareCredentials({ vcp, url }))
        }
    }

    const decline = () => {
        setMode(MODES_QR);
    }

    const sharingSuccess = () => {
        setMode(MODES_QR)
    }


    if (mode === MODES_QUESTION) {
        return <ShareDetails decline={decline} accept={shareAccess} />
    }

    if (mode === MODES_SHARING) {
        return <SharingAccess />
    }

    if (mode === MODES_END) {
        return <ShareDetailsSuccess accept={sharingSuccess} />
    }

    return (
        <div className="container-qrcode" >

            <div className="page">

                <div className="qr-wrapper" >
                    <div className="qr-title">Scan QR code</div>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%', height: '100%' }}
                    />

                </div>

            </div>

            <Tabs tab={1} />
        </div>
    )
}

export default QRCode