const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const moment = require('moment');

const { createPrivateKey, createPublicKey } = require('crypto');
const { generateKeyPair } = require('jose/util/generate_key_pair')

const { ApiPromise, WsProvider } = require('@polkadot/api');

const { VerifiableCredentialUtil, generateUnique } = require('./VerifiableCredentialUtil');
const blake2AsHex = require('@polkadot/util-crypto');
const { v4: uuidv4 } = require('uuid');
var str2ab = require('string-to-arraybuffer')
// const utils = require('./utils');
// import utils from '../utils';

// const web3FromSource =  require('@polkadot/extension-dapp');
// const jsonrpc =  require('@polkadot/types/interfaces/jsonrpc');


// const { web3Accounts, web3Enable } = require('@polkadot/extension-dapp');
const { Keyring } = require('@polkadot/keyring');


const PORT = process.env.PORT || 8080;

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

// *************************************************************************************
const signedTx = async () => {
    const fromAcct = await getFromAcct();
    const transformed = transformParams(paramFields, inputParams);
    // transformed can be empty parameters

    const txExecute = transformed ? api.tx[palletRpc][callable](...transformed): api.tx[palletRpc][callable]();

    await txExecute.signAndSend(fromAcct, txResHandler)

  };

const transformParams = (paramFields, inputParams, opts = { emptyAsNull: true }) => {
    // if `opts.emptyAsNull` is true, empty param value will be added to res as `null`.
    //   Otherwise, it will not be added
    const paramVal = inputParams.map(inputParam => {
      // To cater the js quirk that `null` is a type of `object`.
      if (typeof inputParam === 'object' && inputParam !== null && typeof inputParam.value === 'string') {
        return inputParam.value.trim();
      } else if (typeof inputParam === 'string') {
        return inputParam.trim();
      }
      return inputParam;
    });
    const params = paramFields.map((field, ind) => ({ ...field, value: paramVal[ind] || null }));

    return params.reduce((memo, { type = 'string', value }) => {
      if (value == null || value === '') return (opts.emptyAsNull ? [...memo, null] : memo);

      let converted = value;

      // Deal with a vector
      if (type.indexOf('Vec<') >= 0) {
        converted = converted.split(',').map(e => e.trim());
        converted = converted.map(single => isNumType(type)
          ? (single.indexOf('.') >= 0 ? Number.parseFloat(single) : Number.parseInt(single))
          : single
        );
        return [...memo, converted];
      }

      // Deal with a single value
      if (isNumType(type)) {
        converted = converted.indexOf('.') >= 0 ? Number.parseFloat(converted) : Number.parseInt(converted);
      }
      return [...memo, converted];
    }, []);
  };
  const utils = {
    paramConversion: {
      num: [
        'Compact<Balance>',
        'BalanceOf',
        'u8', 'u16', 'u32', 'u64', 'u128',
        'i8', 'i16', 'i32', 'i64', 'i128'
      ]
    }
  };

  const isNumType = type =>
  utils.paramConversion.num.some(el => type.indexOf(el) >= 0);

// *************************************************************************************
const server = app.listen(PORT, async function () {

    // *********************************************************************
    const convert = (from, to) => str => Buffer.from(str, from).toString(to);
    const hexToUtf8 = convert('hex', 'utf8');
    // const provider = new WsProvider('wss://trackback.dev');
    const provider = new WsProvider('ws://127.0.0.1:9944');
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
    // console.log(api.genesisHash.toHex());

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
          // console.log(didJSON);

        //    console.log(res)
        } else {
          console.log(result);
           
        }
      });

      let didDocument = {"@context":["https://www.w3.org/ns/did/v1","https://w3id.org/security/suites/ed25519-2020/v1"],"id":"did:trackback.dev:0x2a674c8ef2bc79f13faf22d4165ac99efc2cabe6e3194c0a58336fed7c56b1b3","assertionMethod":[{"id":"did:trackback.dev:dia-0x12345678999","type":"Ed25519VerificationKey2020","controller":"did:trackback.dev:dia-0x1234567890","publicKeyMultibase":"MCowBQYDK2VwAyEAgh8ef957I18rSmje4IMASKPo8XAm+MlDXvGSn6OfQlc="}]};
      
      let didDocumentHex= Array.from(
        new Uint8Array(didDocument))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      //**************************************************************************************** */
      var binaryArray = str2ab(JSON.stringify(didDocument) )
     var p =  Array.from(new Uint8Array(binaryArray))
      // let a = JSON.stringify(didDocument);
      // console.log(a)
      // let binaryArray = new Uint8Array(a.length)
      // Array.prototype.forEach.call(binaryArray, function (el, idx, arr) { arr[idx] = a.charCodeAt(idx) })
      // console.log(binaryArray)
      // console.log(binaryArray.length)



      // let js = JSON.stringify(didDocument);
      // console.log(js)
      // console.log(typeof js)
      // let uDIDDoc = Uint8Array.from(didDocument, x => x.charCodeAt(0))
      // console.log(uDIDDoc.lengt)
      // console.log(uDIDDoc)
      //***************************************************************************************** */
      
      const didKey = blake2AsHex.blake2AsHex("trackback.dev").substring(0,8) + "-" + uuidv4();
      console.log("*************************************\n"+didKey+"\n*************************************");

      let didHash = blake2AsHex.blake2AsHex(didDocumentHex);
      let palletRpc = "didModule";
      let callable = "insertDidDocument";

      let inputParams = [p, didKey];
      let paramFields = [true, true];

      const keyring = new Keyring({ type: 'sr25519' });

      const alice = keyring.addFromUri('//Alice');

      const transformParams = (paramFields, inputParams, opts = { emptyAsNull: true }) => {
        const paramVal = inputParams.map(inputParam => {
          if (typeof inputParam === 'object' && inputParam !== null && typeof inputParam.value === 'string') {
            return inputParam.value.trim();
          } else if (typeof inputParam === 'string') {
            return inputParam.trim();
          }
          return inputParam;
        });
        const params = paramFields.map((field, ind) => ({ ...field, value: paramVal[ind] || null }));
    
        return params.reduce((memo, { type = 'string', value }) => {
          if (value == null || value === '') return (opts.emptyAsNull ? [...memo, null] : memo);
    
          let converted = value;

          if (type.indexOf('Vec<') >= 0) {
            converted = converted.split(',').map(e => e.trim());
            converted = converted.map(single => isNumType(type)
              ? (single.indexOf('.') >= 0 ? Number.parseFloat(single) : Number.parseInt(single))
              : single
            );
            return [...memo, converted];
          }
    
          // Deal with a single value
          if (isNumType(type)) {
            converted = converted.indexOf('.') >= 0 ? Number.parseFloat(converted) : Number.parseInt(converted);
          }
          return [...memo, converted];
        }, []);
      };
      const transformed = transformParams(paramFields, inputParams);
      // console.log(...transformed)

      if(transformed){
        // console.log("transformed")
        
         const tt = async() => {
        
          const txExecute = api.tx[palletRpc][callable](...transformed);
          await txExecute.signAndSend(alice, (result)=> {

            console.log(`Current status is ${result.status}`);

            if (result.status.isInBlock) {
              console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
            } else if (result.status.isFinalized) {
              console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
            }
          }
          )
      }
      await tt();
      } else {
        console.log("error")
        const txExecute =api.tx[palletRpc][callable]();
      }
      // const txExecute = transformed ? api.tx[palletRpc][callable](...transformed): api.tx[palletRpc][callable]();
      // Create a extrinsic, transferring 12345 units to Bob
      // console.log(api.query[didModule])
      // await api.query[palletRpc][callable]
      // const transfer = api.query.didModule.dIDDocument.insertDidDocument(didDocument, didKey);
    
      // // Sign and send the transaction using our account
      // const hash = await transfer.signAndSend(alice);
    

    
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
