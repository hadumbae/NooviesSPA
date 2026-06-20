/**
 * @fileoverview UI component for rendering a person's movie credits grouped by professional role.
 */

import {ReactElement} from 'react';
import {RoleTypeDepartment} from "@/domains/roletype";
import {PersonFilmography} from "@/domains/moviecredit";
import {PersonDetailsCreditCard} from "@/views/admin/persons/_comp/person-credits-overview/PersonDetailsCreditCard.tsx";

/**
 * Props for the PersonDetailsCreditList component.
 */
type AccordionListProps = {
    personName: string;
    department: RoleTypeDepartment;
    roleTypeList: PersonFilmography;
}

/**
 * Renders a categorised list of a person's credits.
 */
export function PersonDetailsCreditList(
    {personName, department, roleTypeList}: AccordionListProps
): ReactElement {
    return (
        <>
            {roleTypeList.map(({role, topCredits}) => (
                <section key={`${role}-${department}`} className="space-y-2">
                    <h2 className="primary-text subsection-title">{role}</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {topCredits.map(credit => (
                            <PersonDetailsCreditCard
                                key={credit._id}
                                personName={personName}
                                credit={credit}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </>
    );
}