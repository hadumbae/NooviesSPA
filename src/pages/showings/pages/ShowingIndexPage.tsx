import { FC } from "react";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingIndexHeader from "@/pages/showings/components/admin/index-page/ShowingIndexHeader.tsx";
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import { PaginatedShowingDetails } from "@/pages/showings/schema/showing/Showing.types.ts";
import { PaginatedShowingDetailsSchema } from "@/pages/showings/schema/showing/Showing.schema.ts";
import ShowingIndexListDialog from "@/pages/showings/components/admin/index-page/ShowingIndexListDialog.tsx";
import useFetchShowings from "@/pages/showings/hooks/queries/useFetchShowings.ts";

/**
 * **ShowingIndexPage**
 *
 * Admin index page for **Showings**, displaying a paginated list of movie showings.
 *
 * @description
 * This page component:
 * - Fetches paginated showing data via {@link useFetchShowings}.
 * - Validates the fetched data against {@link PaginatedShowingDetailsSchema}.
 * - Displays a header with the page title and a "Create" button via {@link ShowingIndexHeader}.
 * - Renders a responsive grid of {@link ShowingIndexListDialog} components for each showing.
 * - Shows a placeholder message when no showings are available.
 *
 * Uses {@link QueryBoundary} and {@link ValidatedQueryBoundary} for error handling and schema validation.
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
        queries: { paginated: true, page, perPage, populate: true, virtuals: true },
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedShowingDetailsSchema}>
                {({ items: showings }: PaginatedShowingDetails) => {
                    const hasShowings = (showings || []).length > 0;

                    /** Section displaying all showings as dialog-wrapped cards */
                    const hasShowingsSection = (
                        <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2">
                            {showings.map((showing) => (
                                <ShowingIndexListDialog showing={showing} key={showing._id} />
                            ))}
                        </section>
                    );

                    /** Placeholder section when no showings exist */
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
