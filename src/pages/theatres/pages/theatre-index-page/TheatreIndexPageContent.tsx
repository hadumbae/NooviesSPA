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
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";

/**
 * **Module: Theatre Index Page Content**
 * Main wrapper for the Theatre Index view (cards, filters, pagination).
 */

/** Props for {@link TheatreIndexPageContent}. */
export type TheatreIndexPageContentProps = {
    /** Theatre list to display. */
    theatres: TheatreDetails[];

    /** Total number of theatres for pagination. */
    totalItems: number;
};

/**
 * **Component: TheatreIndexPageContent**
 * Renders the index: header → filters → theatre cards/empty → pagination.
 *
 * **Behaviour**
 * Uses {@link useParsedSearchParams} for filters and
 * {@link usePaginationSearchParams} for pagination state.
 *
 * **Example**
 * ```tsx
 * <TheatreIndexPageContent theatres={items} totalItems={total} />
 * ```
 *
 * @component
 */
const TheatreIndexPageContent = (props: TheatreIndexPageContentProps) => {
    const { theatres, totalItems } = props;

    // ⚡ Search Params ⚡
    const { page, perPage, setPage } = usePaginationSearchParams();
    const { searchParams } = useParsedSearchParams({ schema: TheatreQueryOptionSchema });

    // ⚡ Boolean Flags ⚡
    const hasTheatres = theatres.length > 0;
    const showPaginationButtons = totalItems > perPage;

    // ⚡ Render ⚡
    return (
        <PageFlexWrapper>
            {/* Header */}
            <TheatreIndexHeader />

            {/* Filters */}
            <PresetFilterDialog title="Theatre Filters" description="Filter and sort theatres.">
                <ScrollArea className="max-h-[80vh]">
                    <ScrollBar />
                    <TheatreQueryOptionFormContainer presetValues={searchParams} />
                </ScrollArea>
            </PresetFilterDialog>

            {/* Theatres */}
            {hasTheatres ? (
                <PageSection className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {theatres.map((theatre) => <TheatreIndexCard key={theatre._id} theatre={theatre} />)}
                </PageSection>
            ) : (
                <PageCenter>
                    <span className="text-neutral-400 select-none">There Are No Theatres</span>
                </PageCenter>
            )}

            {/* Pagination */}
            {showPaginationButtons && (
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
