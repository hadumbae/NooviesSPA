/**
 * @file PersonIndexPageContent.tsx
 *
 * Presentational layout for the person index page.
 *
 * Renders:
 * - Page header
 * - Filter dialog
 * - Person grid or empty state
 * - Pagination controls
 */

import PageSection from "@/common/components/page/PageSection.tsx";
import PersonIndexCard from "@/pages/persons/components/PersonIndexCard.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PersonIndexHeader from "@/pages/persons/components/headers/PersonIndexHeader.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import PersonQueryOptionFormContainer
    from "@/pages/persons/components/features/admin/person-query-options/PersonQueryOptionFormContainer.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {PersonDetails} from "@/pages/persons/schema/person/Person.types.ts";
import {PersonQueryOptions} from "@/pages/persons/schema/queries/PersonQueryOption.types.ts";

/**
 * Props for {@link PersonIndexPageContent}.
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
 * Layout component for rendering the person index UI.
 *
 * Handles:
 * - Empty vs populated states
 * - Filter dialog placement
 * - Pagination visibility
 */
const PersonIndexPageContent = (
    {persons, queryOptions, page, perPage, totalItems, setPage}: ContentProps
) => {
    const personSection = (
        <PageSection className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {persons.map(person => <PersonIndexCard key={person._id} person={person}/>)}
        </PageSection>
    );

    const emptySection = (
        <PageCenter>
            <span className="text-neutral-400 select-none">
                There Are No People
            </span>
        </PageCenter>
    );

    const content = persons.length > 0 ? personSection : emptySection;

    return (
        <PageFlexWrapper>
            <PersonIndexHeader/>

            <PresetFilterDialog title="Person Filters" description="Filter and sort persons.">
                <ScrollArea className="max-h-[80vh]">
                    <ScrollBar/>
                    <PersonQueryOptionFormContainer presetValues={queryOptions}/>
                </ScrollArea>
            </PresetFilterDialog>

            {content}

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
