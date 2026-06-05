/**
 * @fileoverview Presentation component for the Person Details page.
 */

import {ReactElement} from 'react';
import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import {Person} from "@/domains/persons/schema/person/Person.types.ts";
import {PersonDetailsPageActions} from "@/views/admin/persons/details-page/actions.tsx";
import {PersonDetailsPageHeader} from './header.tsx';
import {PersonFilmography} from "@/domains/moviecredit/_feat/person-credit";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {PersonDetailsCard} from "@/views/admin/persons/_comp/person-details";
import {PersonDetailsCreditOverview} from "@/views/admin/persons/_comp";

/** Props for the PersonDetailsPageContent component. */
export type PersonDetailsPageContentProps = {
    person: Person;
    creditCount: number;
    movieCount: number;
    filmography: PersonFilmography;
};

/** Renders the primary profile view for a person in the administrative interface. */
export function PersonDetailsPageContent(
    props: PersonDetailsPageContentProps
): ReactElement {
    const {person, filmography, creditCount, movieCount} = props;
    const {name} = person;

    return (
        <PageFlexWrapper>
            <PersonDetailsPageHeader person={person}/>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <section>
                    <SROnly text="Personal Details"/>
                    <PersonDetailsCard
                        person={person}
                        creditCount={creditCount}
                        movieCount={movieCount}
                    />
                </section>

                <section className="space-y-5 md:col-span-2">
                    <PageSectionHeader text="Movie Credits" as="h2"/>
                    <PersonDetailsCreditOverview personName={name} creditsByRole={filmography}/>
                </section>
            </div>

            <PersonDetailsPageActions person={person} className="hidden"/>
        </PageFlexWrapper>
    );
}