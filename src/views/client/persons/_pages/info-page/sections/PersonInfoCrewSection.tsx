/**
 * @fileoverview Section component displaying a person's crew credits grouped by role.
 */

import {ReactElement} from "react";
import {PersonCrewCreditRoleGroup} from "@/domains/movie-credits";
import {PageSectionHeader} from "@/views/common/_comp";
import {PersonInfoCrewCreditCard} from "@/views/client/movie-credits";

/** Props for the PersonInfoCrewSection component. */
type SectionProps = {
    credits: PersonCrewCreditRoleGroup[];
};

/**
 * Renders a list of crew credits categorized by the specific production role.
 */
export function PersonInfoCrewSection(
    {credits}: SectionProps
): ReactElement {
    return (
        <section className="space-y-5">
            <PageSectionHeader text="Crew"/>

            {credits.map(({topCredits, role}) => (
                <div key={topCredits[0]._id} className="space-y-2">
                    <h3 className="primary-text section-title">{role}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {topCredits.map(credit => <PersonInfoCrewCreditCard key={credit._id} credit={credit}/>)}
                    </div>
                </div>
            ))}
        </section>
    );
}