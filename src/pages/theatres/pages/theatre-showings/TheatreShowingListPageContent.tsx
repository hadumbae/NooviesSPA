/**
 * @file TheatreShowingListPageContent.tsx
 *
 * @summary
 * Page content component for listing showings belonging to a theatre.
 */

import { Theatre, TheatreDetails } from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import { ShowingDetails } from "@/pages/showings/schema/showing/Showing.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreShowingListHeader
    from "@/pages/theatres/components/features/admin/theatre-showing-list/TheatreShowingListHeader.tsx";
import TheatreShowingListBreadcrumbs
    from "@/pages/theatres/components/features/admin/theatre-showing-list/TheatreShowingListBreadcrumbs.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import { Plus } from "lucide-react";
import { cn } from "@/common/lib/utils.ts";
import { SecondaryTextBaseCSS } from "@/common/constants/css/TextCSS.ts";
import ShowingSummaryCard from "@/pages/showings/components/admin/card/showing-summary-card/ShowingSummaryCard.tsx";

/**
 * Props for {@link TheatreShowingListPageContent}.
 */
type ContentProps = {
    /** Theatre entity used for header display and routing */
    theatre: Theatre | TheatreDetails;

    /** Total number of showings available */
    totalShowings: number;

    /** Paginated list of showings for the current page */
    showings: ShowingDetails[];

    /** Current pagination page */
    page: number;

    /** Number of items per page */
    perPage: number;

    /** Pagination page setter */
    setPage: (page: number) => void;
};

/**
 * Renders the main content area for the theatre showing list admin page.
 *
 * Handles:
 * - Empty vs populated showing states
 * - Breadcrumb and header rendering
 * - Pagination controls
 *
 * @param props - Component props
 * @returns Theatre showing list page content
 */
const TheatreShowingListPageContent = (props: ContentProps) => {
    const { theatre, totalShowings, showings, page, perPage, setPage } = props;
    const { _id: theatreID, name: theatreName } = theatre;

    // --- Sections ---

    const noShowingSection = (
        <section className="flex-1 flex flex-col justify-center items-center space-y-2">
            <span className={cn(SecondaryTextBaseCSS, "select-none")}>
                There Are No Showings
            </span>
            <LoggedHoverLink to={`/admin/theatres/get/${theatreID}/showings/create`}>
                <Plus /> Register Showings
            </LoggedHoverLink>
        </section>
    );

    const hasShowingSection = (
        <section className="grid grid-cols-1 gap-4">
            {showings.map(
                (showing) => (
                    <ShowingSummaryCard key={showing._id} showing={showing} />
                )
            )}
        </section>
    );

    const contentSection = showings.length > 0
        ? hasShowingSection
        : noShowingSection;

    // --- Render ---
    return (
        <PageFlexWrapper>
            <section className="space-y-2">
                <TheatreShowingListBreadcrumbs
                    theatreID={theatreID}
                    theatreName={theatreName}
                />
                <TheatreShowingListHeader
                    theatreID={theatreID}
                    theatreName={theatreName}
                    showingCount={totalShowings}
                />
            </section>

            {contentSection}

            {totalShowings > perPage && (
                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    totalItems={totalShowings}
                    setPage={setPage}
                />
            )}
        </PageFlexWrapper>
    );
};

export default TheatreShowingListPageContent;
