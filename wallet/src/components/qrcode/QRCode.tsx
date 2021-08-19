/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// @ts-ignore
import QrReader from 'react-qr-reader'

import Tabs from 'components/pageComponents/Tabs';
import ShareDetails from 'components/shareDetails/ShareDetails';

import { sendVCPRequest, getVcpRequest, isSharingVCP, shareCredentials, setVCPIsSharing } from 'reducers/app';
import { getKeys } from 'reducers/user';

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

    const dispatch = useDispatch();

    const isSharing = useSelector(isSharingVCP);
    const vcpRequest = useSelector(getVcpRequest);

    const { publicKey, privateKey } = useSelector(getKeys);

    useEffect(() => {

        if (!isSharing && mode === MODES_SHARING) {
            setMode(MODES_END)
        }

    }, [isSharing, mode]);

    useEffect(() => {

        if (vcpRequest) {
            setMode(MODES_QUESTION)
        }

    }, [vcpRequest]);

    const handleScan = async (data: any) => {

        if (validateUrl(data)) {
            dispatch(sendVCPRequest({ url: data }));
        }
    }

    const handleError = (err: any) => {
        console.error(err)
    }

    const shareAccess = (vcs: any) => {
        if (!vcs || vcs.length === 0) {
            setMode(MODES_QR);
            return;
        };

        setMode(MODES_SHARING);
        dispatch(setVCPIsSharing(true));
        dispatch(shareCredentials({ vcs, url: vcpRequest.publishUrl, publicKey: publicKey!, privateKey: privateKey! }));


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