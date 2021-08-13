const { CompactSign } = require('jose/jws/compact/sign')
const { createPrivateKey } = require('crypto');

function generateUnique() {
  return Math.random().toString(16).slice(2)
}

class VerifiableCredentialUtil {

  createCredential(givenName, familyName, bloodType) {
    const traveller = {
      "givenName": givenName,
      "familyName": familyName,
      "citizenship": "Wakanda"
    }
    Object.assign(traveller, { bloodType })
    const vc = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://trackback.co/identity/v1"
      ],
      "id": "something",
      "type": [
        "VerifiableCredential",
        "DigitalPassportCredential"
      ],
      "issuer": `did:trackback.dev:${generateUnique()}`,
      "expires": "2028-01-01T00:00:00Z",
      "credentialSubject": {
        "type": [
          "DigitalPassport"
        ],
        "id": `did:trackback.dev:0x2a674c8ef2bc79f13faf22d4165ac99efc2cabe6e3194c0a58336fed7c56b1b3`,
        "passport": {
          "id": `did:trackback.dev:${generateUnique()}`,
          "type": "DigitalPassport",
          traveller
        }
      }
    }

    return this.addProof(vc);
  }

  async addProof(vc) {
    try {
      const jsonstr = JSON.stringify(vc);

      const privateKey = createPrivateKey({
        'key': `-----BEGIN PRIVATE KEY-----\nMC4CAQAwBQYDK2VwBCIEIAZKw6rYSoEqxIWsGqWumcyPKx6aHsuY7EJoQNArm3k3\n-----END PRIVATE KEY-----`,
        'format': 'pem',
        'type': 'pkcs8',
      });


      const proof = await this.createProof(jsonstr, privateKey);

      Object.assign(vc, { proof: { ...proof } })

    } catch (error) {
      console.log(error)
    }
    return vc;
  }


  async createProof(jsonstr, privateKey) {
    const encoder = new TextEncoder();

    const jws_compact = await new CompactSign(encoder.encode(jsonstr))
      .setProtectedHeader({ alg: 'EdDSA' })
      .sign(privateKey);

    const proof = {
      "type": "Ed25519Signature2020",
      "created": new Date().toISOString(),
      "verificationMethod": "did:trackback.dev:0x2a674c8ef2bc79f13faf22d4165ac99efc2cabe6e3194c0a58336fed7c56b1b3",
      "proofPurpose": "assertionMethod",
      "proofValue": jws_compact.toString()
    }

    return proof;
  }

  async createPresentation(vc, privateKey, publicKey) {

    const presentation = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
      ],
      "type": "VerifiablePresentation",
      "verifiableCredential": [vc]
    }

    const pubkeyHex = publicKey.export({ format: 'der', type: 'spki' }).toString('base64');

    const proof = await this.createProof(JSON.stringify(presentation), privateKey);
    proof.verificationMethod = `did:trackback.dev-presentation:${generateUnique()}#${pubkeyHex}`

    Object.assign(presentation, { proof: { ...proof } })



    return presentation;
  }

}

module.exports = {
  VerifiableCredentialUtil: new VerifiableCredentialUtil()
}