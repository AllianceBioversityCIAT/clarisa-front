export interface APIError<T> {
    statusCode: number;
    timestamp: Date;
    body : T;
    description : string;
}