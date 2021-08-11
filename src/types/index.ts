
export type App = {
    init: boolean,
    loggedIn: boolean,
    socket: string,
    types: any,

}

export type VerifiableCredential = {
    [key: string]: string | Array<string> | object
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
    vc?: VerifiableCredential;
    vpc?: VerifiableCredentialPresentation;
}


export type Document = {
    id: string;
    title: string;
    subTitle: string;
    vc?: VerifiableCredential;
    vpc?: VerifiableCredentialPresentation;
}

export type DocumentsProps = {
    documents: Array<Document> | undefined;
}
