
export type App = {
    init: boolean,
    loggedIn: boolean,
    socket:string,
    types:any,

}

export type User = {
    name: string;
    lastName: string;
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
