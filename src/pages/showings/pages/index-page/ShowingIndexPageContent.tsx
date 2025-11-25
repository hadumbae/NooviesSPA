/**
 * @file ShowingIndexPageContent.tsx
 * @description
 * Renders the main content section for the Showings index page, including:
 *
 * - A header (`ShowingIndexHeader`)
 * - A responsive grid of showings wrapped in `ShowingIndexListDialog`
 * - A placeholder section when no showings exist
 * - Pagination controls (`PaginationRangeButtons`) when the result set exceeds the page size
 *
 * The component relies on `usePaginationSearchParams` to read and update pagination
 * state via the URL's search parameters.
 *
 * @remarks
 * This component is intended for the **admin Showings index page** and expects
 * already-fetched data (`showings` + `totalItems`).
 *
 * @example
 * ```tsx
 * <ShowingIndexPageContent
 *   showings={data.showings}
 *   totalItems={data.total}
 * />
 * ```
 */

import {FC} from 'react';
import ShowingIndexListDialog from "@/pages/showings/components/admin/index-page/ShowingIndexListDialog.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingIndexHeader from "@/pages/showings/components/admin/index-page/ShowingIndexHeader.tsx";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";

type ContentProps = {
    /** Array of showing objects to be displayed on the page */
    showings: ShowingDetails[];
    /** Total number of items across all pages (not just this page) */
    totalItems: number;
};

/**
 * Displays the list of showings for the admin index page, including pagination and
 * an empty-state fallback.
 *
 * @param props - {@link ContentProps} containing showing data and total item count.
 * @returns A layout component containing the showings list and related UI elements.
 */
const ShowingIndexPageContent: FC<ContentProps> = ({showings, totalItems}) => {
    const {page, perPage, setPage} = usePaginationSearchParams();

    const hasShowings = showings.length > 0;

    /** Section displaying all showings as dialog-wrapped cards */
    const hasShowingsSection = (
        <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2">
            {showings.map((showing) => (
                <ShowingIndexListDialog showing={showing} key={showing._id}/>
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
            <ShowingIndexHeader/>

            {hasShowings ? hasShowingsSection : hasNoShowingsSection}

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

export default ShowingIndexPageContent;
