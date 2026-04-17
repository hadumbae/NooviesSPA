/**
 * @fileoverview Presentation component for the Person Index page.
 * Orchestrates the layout for the person listing grid, search filters,
 * and pagination for the administrative interface.
 */

import PersonIndexCard from "@/views/admin/persons/_comp/person-index/PersonIndexCard.tsx";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import PersonIndexHeader from "@/views/admin/persons/pages/index-page/PersonIndexHeader.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import PersonQueryOptionFormContainer
    from "@/views/admin/persons/_feat/query-option-form/PersonQueryOptionFormContainer.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {PersonDetails} from "@/domains/persons/schema/person/Person.types.ts";
import {PersonQueryOptions} from "@/domains/persons/schema/query-options/PersonQueryOption.types.ts";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

type ContentProps = {
    persons: PersonDetails[];
    queryOptions: PersonQueryOptions;
    page: number;
    perPage: number;
    totalItems: number;
    setPage: (page: number) => void;
};

/**
 * Renders the main person management interface.
 */
const PersonIndexPageContent = (
    {persons, queryOptions, page, perPage, totalItems, setPage}: ContentProps
) => {
    return (
        <PageFlexWrapper>
            <PersonIndexHeader/>

            <PresetFilterDialog
                title="Person Filters"
                description="Filter and sort persons."
            >
                <ScrollArea className="max-h-[80vh]">
                    <ScrollBar/>
                    <PersonQueryOptionFormContainer presetValues={queryOptions}/>
                </ScrollArea>
            </PresetFilterDialog>

            {
                persons.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {persons.map(person => (
                            <PersonIndexCard key={person._id} person={person}/>
                        ))}
                    </div>
                ) : (
                    <EmptyArrayContainer
                        className="flex-1"
                        text="There Are No People"
                    />
                )
            }

            {totalItems > perPage && (
                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    totalItems={totalItems}
                    setPage={setPage}
                />
            )}
        </PageFlexWrapper>
    );
};

export default PersonIndexPageContent;