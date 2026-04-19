/**
 * @fileoverview Presentation component for the administrative Person Index page.
 * Orchestrates the layout for the person listing grid, search filters,
 * and pagination, providing a high-level UI for person management.
 */

import {ReactElement} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import PersonQueryOptionFormContainer
    from "@/views/admin/persons/_feat/query-option-form/PersonQueryOptionFormContainer.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {PersonDetails} from "@/domains/persons/schema/person/Person.types.ts";
import {PersonQueryOptions} from "@/domains/persons/schema/query-options/PersonQueryOption.types.ts";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {PersonIndexHeader} from "@/views/admin/persons/index-page/header.tsx";
import {PersonIndexCard} from "@/views/admin/persons/_comp/person-index";

/**
 * Props for the {@link PersonIndexPageContent} component.
 */
type ContentProps = {
    persons: PersonDetails[];
    queryOptions: PersonQueryOptions;
    page: number;
    perPage: number;
    totalItems: number;
    setPage: (page: number) => void;
};

/**
 * Renders the structural layout for the administrative Person Index.
 */
export function PersonIndexPageContent(
    {persons, queryOptions, page, perPage, totalItems, setPage}: ContentProps
): ReactElement {
    return (
        <PageFlexWrapper>
            <PersonIndexHeader/>

            <PresetFilterDialog title="Person Filters" description="Filter and sort persons.">
                <ScrollArea className="max-h-[80vh]">
                    <ScrollBar/>
                    <PersonQueryOptionFormContainer presetValues={queryOptions}/>
                </ScrollArea>
            </PresetFilterDialog>

            {persons.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {persons.map(person => <PersonIndexCard key={person._id} person={person}/>)}
                </div>
            ) : (
                <EmptyArrayContainer
                    className="flex-1"
                    text="There Are No People"
                />
            )}

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                totalItems={totalItems}
                setPage={setPage}
            />
        </PageFlexWrapper>
    );
}