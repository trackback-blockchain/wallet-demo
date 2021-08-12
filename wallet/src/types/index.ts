
export type App = {
    init: boolean,
    loggedIn: boolean,
    socket: string,
    types: any,
    sharingVCP:boolean;

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
    vc?: VerifiableCredential;
    vcp?: VerifiableCredentialPresentation;
}


export type Document = {
    id: string;
    title: string;
    subTitle: string;
    vc?: VerifiableCredential;
    vcp?: VerifiableCredentialPresentation;
    vcFull?: VerifiableCredential;
    vcpFull?: VerifiableCredentialPresentation;
}

export type DocumentsProps = {
    documents: Array<Document> | undefined;
}
