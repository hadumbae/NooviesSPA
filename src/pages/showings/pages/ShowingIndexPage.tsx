import { FC } from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingIndexHeader from "@/pages/showings/components/admin/index-page/ShowingIndexHeader.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import { PaginatedShowingDetails } from "@/pages/showings/schema/showing/Showing.types.ts";
import { PaginatedShowingDetailsSchema } from "@/pages/showings/schema/showing/Showing.schema.ts";
import ShowingIndexListCard from "@/pages/showings/components/admin/index-page/ShowingIndexListCard.tsx";
import useFetchShowings from "@/pages/showings/hooks/queries/useFetchShowings.ts";

/**
 * @fileoverview
 * Admin index page for **Showings**, displaying a paginated list of movie showings.
 *
 * @description
 * This page component:
 * - Fetches paginated showing data using `useFetchShowings`.
 * - Validates the fetched data against `PaginatedShowingDetailsSchema`.
 * - Displays a header with the page title and a "Create" button.
 * - Renders a responsive grid of {@link ShowingIndexListCard} components for each showing.
 * - Shows a placeholder message when no showings are available.
 *
 * Uses `QueryBoundary` and `ValidatedQueryBoundary` for error handling and schema validation.
 *
 * @component
 * @returns {JSX.Element} The admin showings index page.
 *
 * @example
 * ```tsx
 * import ShowingIndexPage from "@/pages/showings/components/admin/index-page/ShowingIndexPage.tsx";
 *
 * const AdminPage = () => <ShowingIndexPage />;
 * ```
 */
const ShowingIndexPage: FC = () => {
    // Extract pagination parameters from URL or defaults
    const { page, perPage } = usePaginationSearchParams({ page: 1, perPage: 25 });

    // Fetch paginated showings with virtual fields populated
    const query = useFetchShowings({
        queries: { paginated: true, page, perPage, populate: true, virtuals: true }
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedShowingDetailsSchema}>
                {({ items: showings }: PaginatedShowingDetails) => {
                    const hasShowings = (showings || []).length > 0;

                    // Section displaying all showings as cards
                    const hasShowingsSection = (
                        <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2">
                            {showings.map((showing) => (
                                <ShowingIndexListCard showing={showing} key={showing._id} />
                            ))}
                        </section>
                    );

                    // Placeholder section when no showings exist
                    const hasNoShowingsSection = (
                        <PageCenter>
                            <span className="text-neutral-400 select-none">
                                There Are No Showings
                            </span>
                        </PageCenter>
                    );

                    return (
                        <PageFlexWrapper>
                            {/* Page header with title and "Create" button */}
                            <ShowingIndexHeader />
                            {/* Showings grid or placeholder */}
                            {hasShowings ? hasShowingsSection : hasNoShowingsSection}
                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default ShowingIndexPage;
