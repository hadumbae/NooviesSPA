import {
    FilmographyForPersonConfig,
    getFetchFilmographyForPerson
} from "@/domains/movie-credits/_feat/person-credit/repository/repository.ts";
import {PersonCreditBaseURL} from "@/domains/movie-credits/_feat/person-credit/repository/baseURL.ts";

export {
    PersonCreditBaseURL,
    getFetchFilmographyForPerson,
}

export type {
    FilmographyForPersonConfig,
}