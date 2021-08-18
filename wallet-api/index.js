const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const moment = require('moment');

const { createPrivateKey, createPublicKey } = require('crypto');
const { generateKeyPair } = require('jose/util/generate_key_pair')

const { VerifiableCredentialUtil, generateUnique } = require('./VerifiableCredentialUtil');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.disable('x-powered-by');

app.use(cors());

app.options('*', cors())

app.get('/api/status', function (req, res) {
    res.status(200).end();
});

app.post('/api/register', async (req, res) => {

    const { name, lastName, bloodType } = req.body || {};

    const keyPair = await generateKeyPair('EdDSA');

    const publicKey = (keyPair.publicKey).export({ format: 'der', type: 'spki' }).toString('base64');
    const privateKey = (keyPair.privateKey).export({ format: 'der', type: 'pkcs8' }).toString('base64');

    const DATE_FORMAT = "YYYY-MM-DDThh:mm:ss"
    const DATE_FORMAT_SIMPLE = "YYYY-MM-DD"

    const passportVCS = await VerifiableCredentialUtil.createPassportVC({
        surname: lastName,
        givenNames: name,
        nationality: "New Zealand",
        dateOfBirth: "1970-01-01",
        dateOfIssue: moment().format(DATE_FORMAT_SIMPLE),
        dateOfExpiry: "2028-01-01",
        passportNumber: generateUnique().toUpperCase(),
        bloodType
    });

    const driverLicence = await VerifiableCredentialUtil.createDrivingLicenseVCS({
        firstNames: name,
        surname: lastName,
        dateOfBirth: "1970-01-01",
        licence: generateUnique().toUpperCase(),
        version: "234",
        dateOfExpiry: "2028-01-01",
        entitilements: `Class 1 `
    })

    res.status(200).json({
        publicKey,
        privateKey,
        vcs: [
            {
                id: 1,
                type: "DigitalPassportCredential",
                name: "New Zealand Passport",
                department: "Department of Internal Affairs",
                vcs: passportVCS
            },
            {
                id: 2,
                type: "DigitalDriverLicenceCredential",
                name: "New Zealand Driver Licence",
                department: "",
                vcs: driverLicence
            }
        ]
    })
});


app.post('/api/vcp', async (req, res) => {
    const { vcs = [], privateKey: privateKeyHex, publicKey: publicKeyHex } = req.body || {};

    const privateKey = createPrivateKey({
        'key': `-----BEGIN PRIVATE KEY-----\n${privateKeyHex}\n-----END PRIVATE KEY-----`,
        'format': 'pem',
        'type': 'pkcs8',
    });

    const publicKey = createPublicKey({
        'key': `-----BEGIN PUBLIC KEY-----\n${publicKeyHex}\n-----END PUBLIC KEY-----`,
        'format': 'pem',
        'type': 'spki',
    });

    const vcp = await VerifiableCredentialUtil.createPresentation(vcs, privateKey, publicKey)

    res.status(200).json({
        vcp
    });

});


const server = app.listen(PORT, function () {
    console.log(`SERVER LISTENING ${PORT}`);
});

console.log('SERVER STARTING');

process.on('uncaughtException', function (exception) {
    console.log(exception);
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        console.log('HTTP server closed')
    })
});
