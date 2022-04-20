import { BaseDTO } from "./BaseDTO";
import { CGIAREntity } from "./CGIAREntity";
import { Permission } from "./Permission";
import { SimpleDTO } from "./SimpleDTO";

export class Role implements BaseDTO{
    constructor(public id: number, public description?: string, public acronym?: string, 
        public globalUnit?: CGIAREntity, public active?: boolean, 
        public rolePermissions?: Permission[]){ }
}