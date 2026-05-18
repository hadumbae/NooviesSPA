/**
 * @fileoverview Presentational layout for the theatre browsing page.
 */

import {PageFlexWrapper} from "@/views/common/_comp/page";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {BrowseTheatreParamForm} from "@/views/client/theatres/_feat/browse-by-location/BrowseTheatreParamForm.tsx";
import {PaginationValues} from "@/common/features/fetch-pagination-search-params";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {TheatreBrowseListCard} from "@/views/client/theatres/_comp/browse-theatres/TheatreBrowseListCard.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

import {TheatreWithRecentShowings} from "@/domains/theatres/schema/theatre/TheatreWithRecentShowingsSchema.ts";
import {ReactElement} from "react";
import {BrowseTheatreParamFormView} from "@/views/client/theatres/_feat/browse-by-location";
import {BrowseTheatreListPageHeader} from "@/views/client/theatres/browse-theatre-page/header.tsx";

/** Props for the BrowseTheatreListPageContent component. */
type ContentProps = PaginationValues & {
    setPage: (page: number) => void;
    totalTheatres: number;
    theatres: TheatreWithRecentShowings[];
};

/**
 * Renders the theatre browse page layout including location filters and results grid.
 */
export function BrowseTheatreListPageContent(
    {page, perPage, setPage, totalTheatres, theatres}: ContentProps,
): ReactElement {
    return (
        <PageFlexWrapper className="space-y-4">
            <BrowseTheatreListPageHeader/>

            <BrowseTheatreParamForm>
                <Card>
                    <CardContent className="p-4">
                        <BrowseTheatreParamFormView/>
                    </CardContent>
                </Card>
            </BrowseTheatreParamForm>

            {
                theatres.length > 0 ? (
                    <section className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {theatres.map((theatre) => (
                                <TheatreBrowseListCard key={theatre.slug} theatre={theatre}/>
                            ))}
                        </div>

                        <PaginationRangeButtons
                            page={page}
                            perPage={perPage}
                            totalItems={totalTheatres}
                            setPage={setPage}
                        />
                    </section>
                ) : (
                    <EmptyArrayContainer
                        text="No Theatres"
                        className="flex-1"
                    />
                )
            }
        </PageFlexWrapper>
    );
}
