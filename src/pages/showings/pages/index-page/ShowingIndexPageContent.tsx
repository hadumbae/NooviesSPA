/**
 * @file ShowingIndexPageContent.tsx
 *
 * Content layout for the admin showings index page.
 */

import {FC} from "react";
import ShowingIndexListDialog from "@/pages/showings/components/admin/index-page/ShowingIndexListDialog.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingIndexHeader from "@/pages/showings/components/admin/index-page/ShowingIndexHeader.tsx";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";

/**
 * Props for `ShowingIndexPageContent`.
 */
type ContentProps = {
    /** Showings for the current page. */
    showings: ShowingDetails[];

    /** Total number of showings across all pages. */
    totalItems: number;

    /** Current page index (1-based). */
    page: number;

    /** Items per page. */
    perPage: number;

    /** Update the current page. */
    setPage: (page: number) => void;
};

/**
 * Displays showings for the admin index page.
 *
 * Renders a header, a responsive grid of showings, an empty state,
 * and pagination controls when applicable.
 */
const ShowingIndexPageContent: FC<ContentProps> = (props) => {
    const {
        showings,
        totalItems,
        page,
        perPage,
        setPage,
    } = props;

    const showingsSection = (
        <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2">
            {showings.map((showing) => (
                <ShowingIndexListDialog
                    key={showing._id}
                    showing={showing}
                />
            ))}
        </section>
    );

    const emptyStateSection = (
        <PageCenter>
            <span className="text-neutral-400 select-none">
                There Are No Showings
            </span>
        </PageCenter>
    );

    const showingContent = showings.length > 0
        ? showingsSection
        : emptyStateSection;

    return (
        <PageFlexWrapper>
            <ShowingIndexHeader/>

            {showingContent}

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
