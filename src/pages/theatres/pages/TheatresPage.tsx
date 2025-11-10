/**
 * @file TheatresPage.tsx
 * @description Client/admin index page for displaying theatres.
 * Handles fetching, filtering, sorting, and pagination of theatre data.
 * Renders theatre cards or a fallback message when no theatres exist.
 */

import { FC } from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import TheatreIndexHeader from "@/pages/theatres/components/headers/TheatreIndexHeader.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import useFetchTheatres from "@/pages/theatres/hooks/query/useFetchTheatres.ts";
import TheatreIndexCard from "@/pages/theatres/components/index-page/TheatreIndexCard.tsx";
import { PaginatedTheatreDetailsSchema } from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import { PaginatedTheatreDetails } from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import TheatreQueryOptionFormContainer from "@/pages/theatres/components/features/admin/theatre-query-option/TheatreQueryOptionFormContainer.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import { ScrollArea, ScrollBar } from "@/common/components/ui/scroll-area.tsx";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import { TheatreQueryOptionSchema } from "@/pages/theatres/schema/queries/TheatreQueryOption.schema.ts";

/**
 * `TheatresPage` renders the theatre index page with filters, sorting, pagination,
 * and theatre cards.
 *
 * - Sets the page title to `"Theatre Index"`.
 * - Uses URL search parameters to drive filters and pagination.
 * - Fetches theatres using `useFetchTheatres`.
 * - Renders a `QueryBoundary` and `ValidatedQueryBoundary` for safe query handling.
 * - Displays either theatre cards in a grid or a fallback message if no theatres exist.
 * - Includes a `PresetFilterDialog` with `TheatreQueryOptionFormContainer` for filtering and sorting.
 *
 * @component
 * @example
 * ```tsx
 * <TheatresPage />
 * ```
 */
const TheatresPage: FC = () => {
    useTitle("Theatre Index");

    const { page, perPage } = usePaginationSearchParams();
    const { searchParams } = useParsedSearchParams({ schema: TheatreQueryOptionSchema });

    const query = useFetchTheatres({
        virtuals: true,
        populate: true,
        paginated: true,
        page,
        perPage,
        ...searchParams,
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedTheatreDetailsSchema}>
                {(paginatedTheatres: PaginatedTheatreDetails) => {
                    const { items: theatres } = paginatedTheatres;
                    const hasTheatres = (theatres || []).length > 0;

                    const hasTheatreSection = (
                        <PageSection className="grid grid-cols-1 gap-4">
                            {theatres.map((theatre) => (
                                <TheatreIndexCard key={theatre._id} theatre={theatre} />
                            ))}
                        </PageSection>
                    );

                    const hasNoTheatreSection = (
                        <PageCenter>
                            <span className="text-neutral-400 select-none">
                                There Are No Theatres
                            </span>
                        </PageCenter>
                    );

                    return (
                        <PageFlexWrapper>
                            <TheatreIndexHeader />

                            <PresetFilterDialog
                                title="Theatre Filters"
                                description="Filter and sort theatres by attributes."
                            >
                                <ScrollArea className="max-h-[80vh]">
                                    <ScrollBar />
                                    <TheatreQueryOptionFormContainer presetValues={searchParams} />
                                </ScrollArea>
                            </PresetFilterDialog>

                            {hasTheatres ? hasTheatreSection : hasNoTheatreSection}
                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatresPage;
