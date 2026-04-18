/**
 * @fileoverview Presentation component for the Person Details page.
 * Orchestrates the display of personal metadata and grouped movie credits,
 * while providing the underlying action triggers for administrative tasks.
 */

import { ReactElement } from 'react';
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PersonDetailsCard from "@/views/admin/persons/_comp/person-details/PersonDetailsCard.tsx";
import PersonDetailsCreditOverview from "@/views/admin/persons/_comp/person-credits-overview/PersonDetailsCreditOverview.tsx";
import { PageFlexWrapper } from "@/views/common/_comp/page";
import { Person } from "@/domains/persons/schema/person/Person.types.ts";
import { PersonDetailsPageActions } from "@/views/admin/persons/pages/details-page/actions.tsx";
import { PersonDetailsPageHeader } from './header';

import {PersonFilmography} from "src/domains/moviecredit/_feat/person-credit";

/**
 * Props for the {@link PersonDetailsPageContent} component.
 */
export type PersonDetailsPageContentProps = {
    person: Person;
    creditsByRole: PersonFilmography;
};

/**
 * Renders the primary profile view for a person in the administrative interface.
 */
export function PersonDetailsPageContent(
    props: PersonDetailsPageContentProps
): ReactElement {
    const { person, creditsByRole } = props;
    const { name } = person;

    return (
        <PageFlexWrapper>
            {/* Contextual header with primary identity and action triggers */}
            <PersonDetailsPageHeader person={person} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <section>
                    <SectionHeader srOnly={true}>Personal Details</SectionHeader>
                    <PersonDetailsCard person={person} />
                </section>

                <section className="md:col-span-2">
                    <SectionHeader className="mb-4">Movie Credits</SectionHeader>
                    <PersonDetailsCreditOverview
                        personName={name}
                        creditsByRole={creditsByRole}
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