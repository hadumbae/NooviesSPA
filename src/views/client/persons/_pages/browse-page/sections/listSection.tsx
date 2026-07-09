/**
 * @fileoverview Section component for displaying a paginated or filtered list of persons.
 */

import {ReactElement} from "react";
import {PersonSummaryInfo} from "@/domains/persons/_feat/client-view-data";
import {SROnly} from "@/views/common/_comp";
import {BrowsePersonListCard} from "@/views/client/persons";

/** Props for the BrowsePersonsPageListSection component. */
type SectionProps = {
    persons: PersonSummaryInfo[];
    classNames?: {
        section?: string;
        container?: string;
    }
};

/** Renders a grid of person cards for the browse page. */
export function BrowsePersonsPageListSection(
    {persons}: SectionProps
): ReactElement {
    return (
        <section>
            <SROnly as="h2" text="Browse List"/>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {persons.map((p) => <BrowsePersonListCard key={p._id} person={p}/>)}
            </div>
        </section>
    );
}