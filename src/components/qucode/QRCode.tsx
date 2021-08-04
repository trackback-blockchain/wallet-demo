/** @jsxImportSource @emotion/react */

// @ts-ignore
import QrReader from 'react-qr-reader'

import Tabs from 'components/pageComponents/Tabs';

import './qrcode.scss';


function QRCode() {

    const handleScan = (data: any) => {
        console.log(data)
    }

    const handleError = (err: any) => {
        console.error(err)
    }

    return (
        <div className="container-qrcode" >

            <div className="page">

                <div
                    className="qr-wrapper"

                >
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