/**
 * @fileoverview Presentation component for the Person Details page.
 * Orchestrates the display of personal metadata and grouped movie credits,
 * while providing the underlying action triggers for administrative tasks.
 */

import {ReactElement} from 'react';
import PersonDetailsCard from "@/views/admin/persons/_comp/person-details/PersonDetailsCard.tsx";
import PersonDetailsCreditOverview
    from "@/views/admin/persons/_comp/person-credits-overview/PersonDetailsCreditOverview.tsx";
import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import {Person} from "@/domains/persons/schema/person/Person.types.ts";
import {PersonDetailsPageActions} from "@/views/admin/persons/pages/details-page/actions.tsx";
import {PersonDetailsPageHeader} from './header';

import {PersonFilmography} from "src/domains/moviecredit/_feat/person-credit";
import {SROnly} from "@/views/common/_comp/screen-readers";

/**
 * Props for the {@link PersonDetailsPageContent} component.
 */
export type PersonDetailsPageContentProps = {
    person: Person;
    creditCount: number;
    movieCount: number;
    filmography: PersonFilmography;
};

/**
 * Renders the primary profile view for a person in the administrative interface.
 */
export function PersonDetailsPageContent(
    props: PersonDetailsPageContentProps
): ReactElement {
    const {person, filmography} = props;
    const {name} = person;

    return (
        <PageFlexWrapper>
            <PersonDetailsPageHeader person={person}/>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <section>
                    <SROnly>Personal Details</SROnly>
                    <PersonDetailsCard person={person}/>
                </section>

                <section className="md:col-span-2">
                    <PageSectionHeader>Movie Credits</PageSectionHeader>

                    <PersonDetailsCreditOverview
                        personName={name}
                        creditsByRole={filmography}
                    />
                </section>
            </div>

            <PersonDetailsPageActions
                person={person}
                className="hidden"
            />
        </PageFlexWrapper>
    );
}