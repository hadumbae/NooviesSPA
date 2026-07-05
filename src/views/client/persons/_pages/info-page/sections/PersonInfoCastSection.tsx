/**
 * @fileoverview Section component displaying a person's cast credits grouped by role.
 */

import {ReactElement} from "react";
import {PersonCastCreditRoleGroup} from "@/domains/movie-credits";
import {PageSectionHeader} from "@/views/common/_comp";
import {PersonInfoCastCreditCard} from "@/views/client/movie-credits";

/** Props for the PersonInfoCastSection component. */
type SectionProps = {
    credits: PersonCastCreditRoleGroup[]
};

/**
 * Renders a list of cast credits categorized by the specific role played by the person.
 */
export function PersonInfoCastSection(
    {credits}: SectionProps
): ReactElement {
    return (
        <section className="space-y-5">
            <PageSectionHeader text="Cast"/>

            {
                credits.map(({topCredits, role}) => (
                    <div key={topCredits[0]._id} className="space-y-2">
                        <h3 className="primary-text section-title">{role}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {topCredits.map(credit => <PersonInfoCastCreditCard key={credit._id} credit={credit}/>)}
                        </div>
                    </div>
                ))
            }
        </section>
    );
}