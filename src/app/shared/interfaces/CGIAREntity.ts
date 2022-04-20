import { SimpleDTO } from "./SimpleDTO";

export class CGIAREntity implements SimpleDTO {
    constructor(public id: number, public name: string, public acronym?: string, 
        public officialCode?: string, public active?: boolean){ }
}