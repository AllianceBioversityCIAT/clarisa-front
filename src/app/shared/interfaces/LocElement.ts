import { SimpleDTO } from "./SimpleDTO";
export interface LocElement extends SimpleDTO{
    id: number;
    name: string;
    isoAlpha2: string;
}