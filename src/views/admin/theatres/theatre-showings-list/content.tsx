/**
 * @fileoverview Main content component for the theatre showing list administrative page.
 */

import {Theatre, TheatreDetails} from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {TheatreShowingListHeader}
    from "@/views/admin/theatres/theatre-showings-list/header.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {ShowingSummaryCard} from "@/domains/showings/components/admin/card/showing-summary-card/ShowingSummaryCard.tsx";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {ReactElement} from "react";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

/** Props for the TheatreShowingListPageContent component. */
type ContentProps = {
    theatre: Theatre | TheatreDetails;
    totalShowings: number;
    showings: ShowingDetails[];
    page: number;
    perPage: number;
    setPage: (page: number) => void;
};

/**
 * Renders the layout for the theatre showings list, including pagination and empty state handling.
 */
export function TheatreShowingListPageContent(
    {theatre, totalShowings, showings, page, perPage, setPage}: ContentProps
): ReactElement {
    const {slug, name} = theatre;

    return (
        <PageFlexWrapper>
            <TheatreShowingListHeader
                theatreSlug={slug}
                theatreName={name}
                showingCount={totalShowings}
            />

            {
                showings.length > 0 ? (
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {showings.map((showing) => <ShowingSummaryCard key={showing._id} showing={showing}/>)}
                    </section>
                ) : (
                    <EmptyArrayContainer
                        text="There Are No Showings"
                        className="flex-1"
                    />
                )
            }

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                totalItems={totalShowings}
                setPage={setPage}
            />
        </PageFlexWrapper>
    );
}