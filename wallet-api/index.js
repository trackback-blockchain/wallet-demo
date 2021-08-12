const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const { generateKeyPair } = require('jose/util/generate_key_pair')

const { VerifiableCredentialUtil } = require('./VerifiableCredentialUtil')

const PORT = process.env.PORT || 80;

const app = express();
app.use(bodyParser.json());
app.disable('x-powered-by');

app.use(cors());

app.options('*', cors())

app.get('/api/status', function (req, res) {
    res.status(200).end();
});

app.post('/api/register', async (req, res) => {

    const { name, lastName } = req.body || {};

    const keyPair = await generateKeyPair('EdDSA');

    const publicKey = (keyPair.publicKey).export({ format: 'der', type: 'spki' }).toString('base64');
    const privateKey = (keyPair.privateKey).export({ format: 'der', type: 'pkcs8' }).toString('base64');

    const vc = await VerifiableCredentialUtil.createCredential(name, lastName);

    const vcp = await VerifiableCredentialUtil.createPresentation(vc, (keyPair.privateKey), (keyPair.publicKey));


    res.status(200).json({
        publicKey,
        privateKey,
        vc,
        vcp
    })
})


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
