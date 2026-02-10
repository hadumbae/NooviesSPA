/**
 * @file BrowseTheatreListPageContent.tsx
 *
 * Presentational layout for the theatre browse page.
 *
 * Assumes all provided theatres already have
 * recent or upcoming showings available.
 *
 * Handles:
 * - Browse parameter form rendering
 * - Theatre result grid
 * - Empty state messaging
 * - Pagination controls
 */

import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import BrowseTheatreParamFormContainer
    from "@/pages/theatres/components/client/forms/browse-theatre-params/BrowseTheatreParamFormContainer.tsx";
import {PaginationValues} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";
import {TheatreWithRecentShowings} from "@/pages/theatres/schema/model/theatre/TheatreWithRecentShowings.types.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import TheatreBrowseListCard from "@/pages/theatres/components/client/forms/browse-list/TheatreBrowseListCard.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

/**
 * Props for {@link BrowseTheatreListPageContent}.
 */
type ContentProps = PaginationValues & {
    /** Updates the current page number */
    setPage: (page: number) => void;

    /** Total number of matching theatres */
    totalTheatres: number;

    /**
     * Paginated theatre results.
     *
     * All theatres are guaranteed to have
     * recent or upcoming showings.
     */
    theatres: TheatreWithRecentShowings[];
};

/**
 * Renders the theatre browse page layout.
 *
 * Displays:
 * - Location-based browse parameter form
 * - Theatre cards with recent showings
 * - Empty state when no theatres match the criteria
 * - Pagination controls when applicable
 *
 * @remarks
 * This component is purely presentational and assumes
 * filtering and validation have already been handled
 * by the parent page.
 */
const BrowseTheatreListPageContent = (
    {page, perPage, setPage, totalTheatres, theatres}: ContentProps,
) => {
    const theatreSection = (
        <section className="space-y-4">
            <SectionHeader srOnly={true}>Theatres</SectionHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {theatres.map((theatre) => (
                    <TheatreBrowseListCard key={theatre.slug} theatre={theatre}/>
                ))}
            </div>

            {totalTheatres > perPage && (
                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    totalItems={totalTheatres}
                    setPage={setPage}
                />
            )}
        </section>
    );

    return (
        <PageFlexWrapper className="space-y-4">
            <header>
                <HeaderTitle>Theatres</HeaderTitle>
                <HeaderDescription>Theatres Near You</HeaderDescription>
            </header>

            <Card>
                <CardContent className="p-4">
                    <BrowseTheatreParamFormContainer/>
                </CardContent>
            </Card>

            {
                theatres.length > 0
                    ? theatreSection
                    : <EmptyArrayContainer text="No Theatres" className="flex-1"/>
            }
        </PageFlexWrapper>
    );
};

export default BrowseTheatreListPageContent;
