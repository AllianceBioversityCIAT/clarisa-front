import { SimpleDTO } from "./SimpleDTO";

export class Permission implements SimpleDTO {
    constructor(public id: number, public name: string){}
}