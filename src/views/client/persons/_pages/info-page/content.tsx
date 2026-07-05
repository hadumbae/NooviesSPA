/**
 * @fileoverview Content layout for the person information page.
 */

import {ReactElement} from "react";
import {PageFlexWrapper} from "@/views/common/_comp";
import {Person} from "@/domains/persons";
import {organisePersonFilmography, PersonCreditRoleGroup} from "@/domains/movie-credits";
import {PersonInfoCastSection, PersonInfoCrewSection, PersonInfoDetailsCard} from "@/views/client/persons";

/** Props for the PersonInfoContent component. */
type ContentProps = {
    person: Person;
    filmography: PersonCreditRoleGroup[];
};

/**
 * Renders the detailed information, cast credits, and crew credits for a specific person.
 */
export function PersonInfoContent(
    {person, filmography}: ContentProps
): ReactElement {
    const {cast, crew} = organisePersonFilmography({filmography});

    return (
        <PageFlexWrapper>
            <PersonInfoDetailsCard person={person} classNames={{card: "md:col-span-2"}}/>

            {cast.length > 0 && <PersonInfoCastSection credits={cast}/>}
            {crew.length > 0 && <PersonInfoCrewSection credits={crew}/>}
        </PageFlexWrapper>
    );
}