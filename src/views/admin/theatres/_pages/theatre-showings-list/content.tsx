/**
 * @fileoverview Main content component for the theatre showing list administrative page.
 */

import {ReactElement} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {IconButton, PageHeader, PaginationRangeButtons} from "@/views/common/_comp";
import {EmptyArrayContainer} from "@/views/common/_comp/text-display/EmptyArrayContainer.tsx";
import {ShowingSummaryCard} from "@/views/admin/showings/_comp/showing-summary-card";

import {Theatre, TheatreDetails} from "@/domains/theatres";
import {ShowingDetails} from "@/domains/showings/_schema/showing";
import {TheatreShowingListBreadcrumbs} from "@/views/admin/theatres";
import {Plus} from "lucide-react";
import {LoggedLink} from "@/views/common/_feat";

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
            <PageHeader
                title={name}
                description={`Showings At Theatre • ${totalShowings} Showings`}
                breadcrumbs={
                    <TheatreShowingListBreadcrumbs theatreSlug={slug} theatreName={name}/>
                }
                actions={
                    <LoggedLink to={`/admin/theatres/get/${slug}/showings/create`}>
                        <IconButton aria-describedby="plus-link-button" icon={Plus}/>
                    </LoggedLink>
                }
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