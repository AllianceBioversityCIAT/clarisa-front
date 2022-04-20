import { SimpleDTO } from "./SimpleDTO";

export interface Institution extends SimpleDTO{
    acronym: String;
    websiteLink: String;
    added: String;
    type: String;
}