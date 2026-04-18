import {
    PersonCastCredit,
    PersonCastCreditSchema, PersonCredit, PersonCreditSchema, PersonCrewCredit,
    PersonCrewCreditSchema
} from "@/domains/moviecredit/_feat/person-credit/schemas/PersonCreditSchema.ts";
import {
    PersonCreditRoleGroup,
    PersonCreditRoleGroupSchema
} from "@/domains/moviecredit/_feat/person-credit/schemas/PersonCreditRoleGroupSchema.ts";
import {
    PersonFilmography,
    PersonFilmographySchema
} from "@/domains/moviecredit/_feat/person-credit/schemas/PersonFilmographySchema.ts";
import {
    FilmographyForPersonConfig,
    getFetchFilmographyForPerson
} from "@/domains/moviecredit/_feat/person-credit/repository/repository.ts";
import {
    useFetchFilmographyForPerson
} from "@/domains/moviecredit/_feat/person-credit/fetch/useFetchFilmographyForPerson.ts";
import {
    PersonCreditStats,
    PersonCreditStatsSchema
} from "@/domains/moviecredit/_feat/person-credit/schemas/PersonCreditStatsSchema.ts";

export {
    PersonCrewCreditSchema,
    PersonCastCreditSchema,
    PersonCreditSchema,
    PersonCreditRoleGroupSchema,
    PersonFilmographySchema,
    getFetchFilmographyForPerson,
    useFetchFilmographyForPerson,
    PersonCreditStatsSchema,
}

export type {
    PersonCrewCredit,
    PersonCastCredit,
    PersonCredit,
    PersonCreditRoleGroup,
    PersonFilmography,
    FilmographyForPersonConfig,
    PersonCreditStats,
}


