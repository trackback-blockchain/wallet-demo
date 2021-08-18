
export type App = {
    init: boolean,
    loggedIn: boolean,
    socket: string,
    types: any,
    sharingVCP: string;
    vcpRequest:any

}

export type VerifiableCredential = {
    [key: string]: string | Array<string> | object | any
}

export type VerifiableCredentialPresentation = {
    [key: string]: string | Array<string> | object;
    verifiableCredential: Array<VerifiableCredential>;
    proof: {
        [key: string]: string
    }
}

export type User = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    documents?: Array<Document>;
    publicKey?: string;
    privateKey?: string;
}

export type VCResponse = {
    partialVCS: Array<VerifiableCredential>
    vc: VerifiableCredential
}

export type Document = {
    id: string;
    type: string;
    name: string;
    department: string;
    vcs: VCResponse;
}

export type DocumentsProps = {
    documents: Array<Document> | undefined;
}
