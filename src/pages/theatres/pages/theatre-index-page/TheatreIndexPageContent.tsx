import {FC} from 'react';
import PageSection from "@/common/components/page/PageSection.tsx";
import TheatreIndexCard from "@/pages/theatres/components/index-page/TheatreIndexCard.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreIndexHeader from "@/pages/theatres/components/headers/TheatreIndexHeader.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import TheatreQueryOptionFormContainer
    from "@/pages/theatres/components/features/admin/theatre-query-option/TheatreQueryOptionFormContainer.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {TheatreQueryOptionSchema} from "@/pages/theatres/schema/queries/TheatreQueryOption.schema.ts";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";

/**
 * Props for {@link TheatreIndexPageContent}.
 *
 * Represents the full dataset and pagination information required to
 * render the theatre index page.
 */
export type TheatreIndexPageContentProps = {
    /**
     * A list of theatres returned from the API.
     * Each item contains detailed metadata such as name, location, IDs, etc.
     */
    theatres: TheatreDetails[];

    /**
     * The total number of theatre items available across all pages.
     * Used to determine if pagination controls should be displayed.
     */
    totalItems: number;
};

/**
 * **TheatreIndexPageContent**
 *
 * Renders the main content area of the Theatre Index page, including:
 * - A header section with page-level controls
 * - A filter dialog with query schema–driven forms
 * - A responsive card grid of theatres
 * - Empty-state UI when no theatre data is available
 * - Pagination controls when needed
 *
 * This component combines UI presentation with parsed URL search params
 * to support filtering, sorting, and pagination in a unified layout.
 *
 * @component
 */
const TheatreIndexPageContent: FC<TheatreIndexPageContentProps> = (props) => {
    const {theatres, totalItems} = props;
    const hasTheatres = (theatres || []).length > 0;

    // ⚡ Search Params ⚡

    const {page, perPage, setPage} = usePaginationSearchParams();
    const {searchParams} = useParsedSearchParams({schema: TheatreQueryOptionSchema});

    // ⚡ Theatres ⚡

    const hasTheatreSection = (
        <PageSection className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {theatres.map((theatre) => <TheatreIndexCard key={theatre._id} theatre={theatre}/>)}
        </PageSection>
    );

    const hasNoTheatreSection = (
        <PageCenter>
            <span className="text-neutral-400 select-none">There Are No Theatres</span>
        </PageCenter>
    );

    // ⚡ Filters & Sorts ⚡

    const filterDialog = (
        <PresetFilterDialog title="Theatre Filters" description="Filter and sort theatres by attributes.">
            <ScrollArea className="max-h-[80vh]">
                <ScrollBar/>
                <TheatreQueryOptionFormContainer presetValues={searchParams}/>
            </ScrollArea>
        </PresetFilterDialog>
    );

    return (
        <PageFlexWrapper>
            <TheatreIndexHeader/>
            {filterDialog}
            {hasTheatres ? hasTheatreSection : hasNoTheatreSection}

            {
                totalItems > perPage &&
                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    totalItems={totalItems}
                    setPage={setPage}
                />
            }
        </PageFlexWrapper>
    );
};

export default TheatreIndexPageContent;
