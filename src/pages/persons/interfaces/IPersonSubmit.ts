import {ISO3166Alpha2CountryCode} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";

export interface IPersonSubmit {
    name: string,
    biography: string,
    dob: string,
    nationality: "" | ISO3166Alpha2CountryCode,
}