const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const { generateKeyPair } = require('jose/util/generate_key_pair')

const { ApiPromise, WsProvider } = require('@polkadot/api');

const { VerifiableCredentialUtil } = require('./VerifiableCredentialUtil')

const PORT = process.env.PORT || 80;

const app = express();
app.use(bodyParser.json());
app.disable('x-powered-by');

app.use(cors());

app.options('*', cors())

app.get('/api/status', function (req, res) {
    console.log("Hello World")
    res.status(200).end();
});

app.post('/api/register', async (req, res) => {

    const { name, lastName, bloodType } = req.body || {};

    const keyPair = await generateKeyPair('EdDSA');

    const publicKey = (keyPair.publicKey).export({ format: 'der', type: 'spki' }).toString('base64');
    const privateKey = (keyPair.privateKey).export({ format: 'der', type: 'pkcs8' }).toString('base64');

    const vc = await VerifiableCredentialUtil.createCredential(name, lastName);
    const vcFull = await VerifiableCredentialUtil.createCredential(name, lastName, bloodType);

    const vcp = await VerifiableCredentialUtil.createPresentation(vc, (keyPair.privateKey), (keyPair.publicKey));
    const vcpFull = await VerifiableCredentialUtil.createPresentation(vcFull, (keyPair.privateKey), (keyPair.publicKey));


    res.status(200).json({
        publicKey,
        privateKey,
        vc,
        vcp,
        vcFull,
        vcpFull
    })
})


const server = app.listen(PORT, async function () {
    console.log("Hello World")

    // *********************************************************************
    const convert = (from, to) => str => Buffer.from(str, from).toString(to);
    const hexToUtf8 = convert('hex', 'utf8');
    const provider = new WsProvider('wss://trackback.dev');
    const types = {
        "VerifiableCredential": {
            "account_id": "AccountId",
            "public_key": "Vec<8>",
            "block_time_stamp": "u64",
            "active": "bool"
        },
        "DID": {
            "did_uri": "Vec<u8>",
            "did_document": "Vec<u8>",
            "block_number": "BlockNumber",
            "block_time_stamp": "u64",
            "did_ref": "Vec<u8>",
            "sender_account_id": "AccountId",
            "active": "Option<bool>"
        }
    };

    const rpc = {
        "didModule": {
            "dIDDocument": {
                "description": "Get DID Documnet",
                "params": [
                    {
                        "name": "didDocumentHash",
                        "type": "Vec<u8>"
                    }
                ],
                "type": "DID"
            }
        }
    };

    const api = await ApiPromise.create({ provider: provider, types, rpc });
    console.log(api.genesisHash.toHex());

    let didDocumentHash = "0x2a674c8ef2bc79f13faf22d4165ac99efc2cabe6e3194c0a58336fed7c56b1b3";

    api.query.didModule.dIDDocument(didDocumentHash, (result) =>{
      
        if (!result.isEmpty){
          let res = JSON.parse(result);
        //   console.log(result)
          let owner = res["sender_account_id"].toString();
          let block_number = res["block_number"];
            

          const did_document_hex = res.did_document;
          const hex = did_document_hex.substr(2);
          const didJSON = JSON.parse(hexToUtf8(hex));
          console.log(didJSON);
        //    console.log(res)
        } else {
          console.log(result);
          setBlock(0);
        }
      });
      
    // *********************************************************************


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
