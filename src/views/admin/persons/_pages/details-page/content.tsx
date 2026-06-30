/**
 * @fileoverview Presentation component for the Person Details page.
 */

import {ReactElement} from 'react';
import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import {PersonDetailsPageActions} from "@/views/admin/persons/_pages/details-page/sections/actions.tsx";
import {PersonDetailsPageHeader} from "@/views/admin/persons/_pages/details-page/sections/header.tsx";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {PersonDetailsCard} from "@/views/admin/persons/_comp/person-details";
import {PersonDetailsCreditOverview} from "@/views/admin/persons/_comp";
import {Person} from "@/domains/persons";
import {PersonFilmography} from "@/domains/movie-credits";


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