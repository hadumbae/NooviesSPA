/**
 * @fileoverview Component for displaying a categorised overview of a person's movie credits.
 */

import {ReactElement} from 'react';
import {SROnly} from "@/views/common/_comp/screen-readers";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {PersonFilmography} from "@/domains/moviecredit";
import {PersonDetailsCreditList} from "@/views/admin/persons/_comp/person-credits-overview/PersonDetailsCreditList.tsx";

/** Props for the PersonDetailsCreditOverview component. */
type OverviewProps = {
    personName: string;
    creditsByRole: PersonFilmography;
}

/**
 * Displays a person's movie credits organised into cast and crew sections.
 */
export function PersonDetailsCreditOverview(
    {personName, creditsByRole}: OverviewProps
): ReactElement {
    const hasNoCredits = creditsByRole.length === 0;

    if (hasNoCredits) {
        return (
            <section className="h-32 border rounded-xl flex justify-center items-center">
                <SROnly text="Person : No Credits"/>
                <EmptyArrayContainer text="There Are No Credits"/>
            </section>
        )
    }

    const crewCredits = creditsByRole.filter(role => role.department === "CREW");
    const castCredits = creditsByRole.filter(role => role.department === "CAST");

    return (
        <div className="space-y-4">
            {castCredits.length > 0 && (
                <section className="space-y-4">
                    <SectionHeader srOnly={true}>{personName} : CAST Credits</SectionHeader>
                    <PersonDetailsCreditList department="CAST" personName={personName} roleTypeList={castCredits}/>
                </section>
            )}

            {crewCredits.length > 0 && (
                <section className="space-y-4">
                    <SectionHeader srOnly={true}>{personName} : CREW Credits</SectionHeader>
                    <PersonDetailsCreditList department="CREW" personName={personName} roleTypeList={crewCredits}/>
                </section>
            )}
        </div>
    );
}
