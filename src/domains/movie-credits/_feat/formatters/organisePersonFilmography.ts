/**
 * @fileoverview Formatter that organizes a person's filmography into cast and crew categories.
 */

import {PersonCastCreditRoleGroup, PersonCreditRoleGroup, PersonCrewCreditRoleGroup} from "@/domains/movie-credits";

/** Configuration for organizing a person's filmography. */
type OrganisedConfig = {
    filmography: PersonCreditRoleGroup[];
}

/** The organized filmography data including totals and categorized roles. */
type OrganisedReturns = {
    totalCredits: number;
    cast: PersonCastCreditRoleGroup[];
    crew: PersonCrewCreditRoleGroup[];
}

/** Separates a raw filmography list into distinct cast and crew groups. */
export function organisePersonFilmography(
    {filmography}: OrganisedConfig
): OrganisedReturns {
    const totalCredits = filmography.reduce((acc, cur) => acc + cur.totalCredits, 0);
    const cast = filmography.filter(f => f.department === "CAST") as PersonCastCreditRoleGroup[];
    const crew = filmography.filter(f => f.department === "CREW") as PersonCrewCreditRoleGroup[];

    return {
        totalCredits,
        cast,
        crew
    };
}