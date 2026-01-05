/**
 * @file TheatreIndexPageContent.tsx
 *
 * Main content renderer for the Theatre Index admin page.
 * Responsible for displaying filters, theatre cards, empty state,
 * and pagination controls.
 */

import PageSection from "@/common/components/page/PageSection.tsx";
import TheatreIndexCard from "@/pages/theatres/components/admin/pages/theatre-index/TheatreIndexCard.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreIndexHeader from "@/pages/theatres/components/admin/pages/theatre-index/TheatreIndexHeader.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import TheatreQueryOptionFormContainer
    from "@/pages/theatres/components/admin/form/theatre-query-option/TheatreQueryOptionFormContainer.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {TheatreQueryOptionSchema} from "@/pages/theatres/schema/queries/TheatreQueryOption.schema.ts";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";

/**
 * Props for {@link TheatreIndexPageContent}.
 */
export type TheatreIndexPageContentProps = {
    /** Theatres to render for the current page. */
    theatres: TheatreDetails[];

    /** Total number of theatres across all pages. */
    totalItems: number;

    /** Current pagination page (1-based). */
    page: number;

    /** Number of theatres displayed per page. */
    perPage: number;

    /** Updates the current page number. */
    setPage: (page: number) => void;
};

/**
 * **Component: TheatreIndexPageContent**
 *
 * Renders the Theatre Index layout:
 * header → filters → theatre cards or empty state → pagination.
 *
 * **Behaviour**
 * - Reads filter and sort state via {@link useParsedSearchParams}
 * - Displays an empty state when no theatres are available
 * - Conditionally renders pagination controls based on result size
 *
 * **Data Flow**
 * - Receives paginated data and pagination state from the parent page
 * - Delegates filtering UI to {@link TheatreQueryOptionFormContainer}
 *
 * **Example**
 * ```tsx
 * <TheatreIndexPageContent
 *   theatres={items}
 *   totalItems={total}
 *   page={page}
 *   perPage={20}
 *   setPage={setPage}
 * />
 * ```
 *
 * @component
 */
const TheatreIndexPageContent = (props: TheatreIndexPageContentProps) => {
    const {theatres, page, perPage, setPage, totalItems} = props;
    const {searchParams} = useParsedSearchParams({schema: TheatreQueryOptionSchema});

    const pageContent = theatres.length > 0 ? (
        <PageSection className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {theatres.map(
                (theatre) => <TheatreIndexCard key={theatre._id} theatre={theatre}/>
            )}
        </PageSection>
    ) : (
        <PageCenter>
            <span className="text-neutral-400 select-none">
                There Are No Theatres
            </span>
        </PageCenter>
    );

    return (
        <PageFlexWrapper>
            <TheatreIndexHeader/>

            <PresetFilterDialog title="Theatre Filters" description="Filter and sort theatres.">
                <ScrollArea className="max-h-[80vh]">
                    <ScrollBar/>
                    <TheatreQueryOptionFormContainer presetValues={searchParams}/>
                </ScrollArea>
            </PresetFilterDialog>

            {pageContent}

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

export default TheatreIndexPageContent;
