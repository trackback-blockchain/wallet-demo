const { CompactSign } = require('jose/jws/compact/sign')
const { createPrivateKey, createHash } = require('crypto');

function generateUnique() {
  return Math.random().toString(16).slice(2)
}

class VerifiableCredentialUtil {

  async createPassportVC({ surname, givenNames, nationality, dateOfBirth, dateOfIssue, dateOfExpiry, passportNumber, bloodType }) {


    const traveller = {
      "givenNames": givenNames,
      "surname": surname,
      "nationality": nationality,
      dateOfBirth,
      dateOfIssue,
      dateOfExpiry,
      passportNumber,
      bloodType
    }


    const passport = {
      "id": `did:trackback.dev:${generateUnique()}`,
      "type": "DigitalPassport",
    }

    const baseClaim = {
      "type": [
        "DigitalPassport"
      ],
      "id": `did:trackback.dev:0x2a674c8ef2bc79f13faf22d4165ac99efc2cabe6e3194c0a58336fed7c56b1b3`,
    }

    const baseCredential = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://trackback.co/identity/v1"
      ],
      id: `did:trackback.dev:nzpassport-${generateUnique()}`,
      "type": [
        "VerifiableCredential",
        "DigitalPassportCredential"
      ],
      "issuer": `did:trackback.dev:nzgov-${generateUnique()}`,
      "expires": "2028-01-01T00:00:00Z",

    }

    const privateKey = createPrivateKey({
      'key': `-----BEGIN PRIVATE KEY-----\nMC4CAQAwBQYDK2VwBCIEIAZKw6rYSoEqxIWsGqWumcyPKx6aHsuY7EJoQNArm3k3\n-----END PRIVATE KEY-----`,
      'format': 'pem',
      'type': 'pkcs8',
    });


    const _vc2 = { ...baseCredential, credentialSubject: { ...baseClaim, passport: { ...passport, traveller: { ...traveller } } } };

    const vcsPromises = Object.keys(traveller).map(async (key) => {
      const _vc = { ...baseCredential, credentialSubject: { ...baseClaim, passport: { ...passport, traveller: { [key]: traveller[key] } } } };

      const vc = await this.addProof(_vc, privateKey);
      return vc;

    });

    const vcs = await Promise.all(vcsPromises)

    const fullvc = await this.addProof(_vc2, privateKey);

    return { partialVCS: [...vcs], vc: fullvc }
  }


  async createDrivingLicenseVCS({ firstNames, surname, dateOfBirth, licence, version, entitilements = [], dateOfExpiry }) {

    const shareableVC = {
      licence,
      surname,
      firstNames,
      dateOfBirth,
      version,
      dateOfExpiry,
      entitilements,
    }

    const baseClaim = {
      "id": `did:trackback.dev:nzdia-licence-${licence}`,
    }

    const baseCredential = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://trackback.co/identity/v1"
      ],
      id: `did:trackback.dev:nzlicence-${generateUnique()}`,
      "type": [
        "VerifiableCredential",
        "DigitalDriverLicenceCredential"
      ],
      "issuer": `did:trackback.dev:nzdia-${generateUnique()}`
    }

    const privateKey = createPrivateKey({
      'key': `-----BEGIN PRIVATE KEY-----\nMC4CAQAwBQYDK2VwBCIEIAZKw6rYSoEqxIWsGqWumcyPKx6aHsuY7EJoQNArm3k3\n-----END PRIVATE KEY-----`,
      'format': 'pem',
      'type': 'pkcs8',
    });

    const vcsPromises = Object.keys(shareableVC).map(async (key) => {
      const _vc = { ...baseCredential }
      Object.assign(_vc, { credentialSubject: { ...baseClaim, [key]: shareableVC[key] } })
      const vc = await this.addProof(_vc, privateKey);
      return vc;
    });

    const _fvc = { ...baseCredential }
    Object.assign(_fvc, { credentialSubject: { ...baseClaim, ...shareableVC } })
    const fullvc = await this.addProof(_fvc, privateKey);

    const vcs = await Promise.all(vcsPromises)
    return { partialVCS: [...vcs], vc: fullvc }

  }

  async addProof(vc, privateKey) {
    try {
      const jsonstr = JSON.stringify(vc);

      const hash = createHash('sha256').update(jsonstr).digest('base64');

      const proof = await this.createProof(hash, privateKey);

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

  async createPresentation(vcs, privateKey, publicKey) {

    const presentation = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
      ],
      "type": "VerifiablePresentation",
      "verifiableCredential": [...vcs]
    }

    const pubkeyHex = publicKey.export({ format: 'der', type: 'spki' }).toString('base64');

    const hash = createHash('sha256').update(JSON.stringify(presentation)).digest('base64');

    const proof = await this.createProof(hash, privateKey);
    proof.verificationMethod = `did:trackback.dev-presentation:${generateUnique()}#${pubkeyHex}`

    Object.assign(presentation, { proof: { ...proof } })

    return presentation;
  }

}

module.exports = {
  VerifiableCredentialUtil: new VerifiableCredentialUtil(),
  generateUnique
}