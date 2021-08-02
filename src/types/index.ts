export type App = {
    init: boolean,
    loggedIn: boolean
}

export type User = {
    name: string;
    email: string;
    password: string
}


export type Document = {
    id: string;
    title: string;
    subTitle: string;
}

export type DocumentsProps = {
    documents: Array<Document>;
}
