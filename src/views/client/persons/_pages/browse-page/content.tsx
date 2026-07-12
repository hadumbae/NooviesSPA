/**
 * @fileoverview Content layout for the person browsing page.
 */

import {ReactElement} from "react";
import {PersonSummaryInfo} from "@/domains/persons/_feat/client-view-data";
import {PageFlexWrapper, PageHeader} from "@/views/common/_comp";
import {PaginationRangeButtons} from "@/views/common/_comp";
import {BrowsePersonsPageListSection} from "@/views/client/persons/_pages/browse-page/sections";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {
    BrowsePersonsQueryOptionForm,
    BrowsePersonsQueryOptionsFormCollapsible,
    BrowsePersonsQueryOptionsFormView
} from "@/views/client/persons";

/** Props for the BrowsePersonsPageContent component. */
type ContentProps = {
    totalPersons: number;
    persons: PersonSummaryInfo[];
    page: number;
    perPage: number;
    setPage: (value: number) => void;
};

/** Main content view for browsing and filtering people. */
export function BrowsePersonsPageContent(
    {persons, totalPersons, page, perPage, setPage}: ContentProps
): ReactElement {
    return (
        <PageFlexWrapper>
            <PageHeader
                title="Browse | People"
                description="Explore the cast and crew behind your favorite movies."
            />

            <BrowsePersonsQueryOptionForm>
                <BrowsePersonsQueryOptionsFormCollapsible>
                    <BrowsePersonsQueryOptionsFormView/>
                </BrowsePersonsQueryOptionsFormCollapsible>
            </BrowsePersonsQueryOptionForm>

            {
                persons.length > 0
                    ? <BrowsePersonsPageListSection persons={persons}/>
                    : <EmptyArrayContainer className="flex-1" text="No Persons Found"/>
            }

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                totalItems={totalPersons}
                setPage={setPage}
            />
        </PageFlexWrapper>
    );
}