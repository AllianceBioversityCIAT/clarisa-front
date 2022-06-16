export interface Confirmation{
    body: string;
    title?: titleInterfaces;
    confirmAction?: string;
    cancelAction?: string;
}

export interface titleInterfaces{
    messages:string;
    user?: string;
}