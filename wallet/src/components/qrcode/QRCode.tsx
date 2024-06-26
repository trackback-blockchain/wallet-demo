/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

// @ts-ignore
import QrReader from 'react-qr-reader'

import Tabs from 'components/pageComponents/Tabs';
import ShareDetails from 'components/shareDetails/ShareDetails';

import { sendVCPRequest, getVcpRequest, getSharingVCP, shareCredentials, setVCPIsSharing, setVcpRequest } from 'reducers/app';
import { getDocumentbyType, getKeys, loadVCFromIssuer, setVerificationFaild } from 'reducers/user';

import SharingAccess from 'components/shareDetails/SharingAccess';
import ShareDetailsSuccess from 'components/shareDetails/ShareDetailsSuccess';
import ShareDetailsFailed from 'components/shareDetails/ShareDetailsFailed';
import GenerateVCP from 'components/shareDetails/GenerateVCP';

import './qrcode.scss';
import { AppState } from 'store';

function validateUrl(value: string) {
    return /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi.test(value);
}

const MODES_QR = 'MODES_QR';
const MODES_QUESTION = 'MODES_QUESTION';
const MODES_SHARING = 'MODES_SHARING';
const MODES_END = 'MODES_END';
const MODES_FAILED = 'MODES_FAILED';
const MODES_PROCESSING = 'MODES_PROCESSING';

function QRCode() {
    const history = useHistory();
    const [mode, setMode] = useState<string>(MODES_QR);

    const dispatch = useDispatch();

    const sharingVCP = useSelector(getSharingVCP);
    const vcpRequest = useSelector(getVcpRequest);

    const type = vcpRequest?.schema?.vc;
    const doc = useSelector((state: AppState) => getDocumentbyType(state, type));

    const { publicKey, privateKey } = useSelector(getKeys);

    useEffect(() => {

        if (sharingVCP === 'fulfilled' && mode === MODES_SHARING) {
            setMode(MODES_END)
        }
        if (sharingVCP === 'rejected' && mode === MODES_SHARING) {
            dispatch(setVerificationFaild(vcpRequest))
            setMode(MODES_FAILED)
        }

    }, [sharingVCP, mode, dispatch, vcpRequest]);

    useEffect(() => {
        if (vcpRequest) {
            if (!doc) {
                setMode(MODES_QR);
                dispatch(setVCPIsSharing(false));
                dispatch(setVcpRequest(null));
            } else {
                setMode(MODES_QUESTION);
            }
        }

    }, [vcpRequest, doc, dispatch]);

    const toJSON = (data: string) => {
        try {
            return JSON.parse(data).vc
        } catch (error) {
            return false;
        }
    }

    const addVCDocument = (data: string) => {
        try {
            dispatch(loadVCFromIssuer(data));
            history.push("/");
        } catch (error) {

        }
    }

    const createVCPRequest = (data: string) => {

        const url = (data || '').replaceAll("https://wallet.trackback.dev?r=", "")

        if (validateUrl(url)) {
            setMode(MODES_PROCESSING)
            dispatch(sendVCPRequest({ url }));
        }
    }

    const handleScan = (data: string) => {

        if (!data) return;

        const dataJSON = toJSON(data);

        if (dataJSON) {
            addVCDocument(dataJSON)
        } else {
            createVCPRequest(data)
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

    const qrMode = () => {

        dispatch(setVCPIsSharing(false));
        dispatch(setVcpRequest(null));
        setMode(MODES_QR);
    }

    const decline = () => {
        qrMode();
    }

    const sharingSuccess = () => {
        qrMode()
    }

    if (mode === MODES_QUESTION) {
        return <ShareDetails decline={decline} accept={shareAccess} />
    }

    if (mode === MODES_SHARING) {
        return <SharingAccess />
    }

    if (mode === MODES_PROCESSING) {
        return <GenerateVCP />
    }

    if (mode === MODES_END) {
        return <ShareDetailsSuccess accept={sharingSuccess} />
    }

    if (mode === MODES_FAILED) {
        return <ShareDetailsFailed accept={sharingSuccess} />
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