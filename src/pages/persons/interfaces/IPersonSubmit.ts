import {ISO3166Alpha2Code} from "@/common/schema/enums/ISO3166Alpha2CodeEnum.ts";

export interface IPersonSubmit {
    name: string,
    biography: string,
    dob: string,
    nationality: "" | ISO3166Alpha2Code,
}