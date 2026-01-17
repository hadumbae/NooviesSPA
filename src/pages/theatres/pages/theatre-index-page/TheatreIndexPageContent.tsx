/**
 * @file TheatreIndexPageContent.tsx
 *
 * Content renderer for the Theatre Index admin page.
 *
 * Renders:
 * - Page header and filter dialog
 * - Theatre cards or empty state
 * - Pagination controls
 */

import PageSection from "@/common/components/page/PageSection.tsx";
import TheatreIndexCard from "@/pages/theatres/components/admin/pages/theatre-index/TheatreIndexCard.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreIndexHeader from "@/pages/theatres/components/admin/pages/theatre-index/TheatreIndexHeader.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import TheatreQueryOptionFormContainer
    from "@/pages/theatres/components/admin/form/theatre-query-option/TheatreQueryOptionFormContainer.tsx";
import {Theatre, TheatreDetails} from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {TheatreQueryOptionSchema} from "@/pages/theatres/schema/queries/TheatreQueryOption.schema.ts";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import useNavigateToTheatre from "@/pages/theatres/hooks/navigation/navigate-to-theatre/useNavigateToTheatre.ts";

/**
 * Props for {@link TheatreIndexPageContent}.
 */
export type TheatreIndexPageContentProps = {
    /** Paginated theatre results */
    theatres: TheatreDetails[];

    /** Total number of theatres */
    totalItems: number;

    /** Current page (1-based) */
    page: number;

    /** Items per page */
    perPage: number;

    /** Page setter */
    setPage: (page: number) => void;
};

/**
 * Theatre Index page content.
 *
 * Layout:
 * header → filters → theatre cards / empty state → pagination
 *
 * - Filter state is derived from URL search params
 * - Pagination rendering is conditional on total size
 *
 * @component
 */
const TheatreIndexPageContent = (
    {theatres, page, perPage, setPage, totalItems}: TheatreIndexPageContentProps
) => {
    const {searchParams} = useParsedSearchParams({
        schema: TheatreQueryOptionSchema,
    });

    const navigateToTheatre = useNavigateToTheatre();

    const pageContent =
        theatres.length > 0 ? (
            <PageSection className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {theatres.map((theatre) => (
                    <TheatreIndexCard
                        key={theatre._id}
                        theatre={theatre}
                    />
                ))}
            </PageSection>
        ) : (
            <PageCenter>
                <span className="text-neutral-400 select-none">
                    There are no theatres
                </span>
            </PageCenter>
        );

    /**
     * Navigates to the theatre detail page after successful submit.
     */
    const onSubmitSuccess = (theatre: Theatre) => {
        navigateToTheatre({
            slug: theatre.slug,
            component: TheatreIndexPageContent.name,
            message: "Navigate to theatre after submit.",
        });
    };

    return (
        <PageFlexWrapper>
            <TheatreIndexHeader onSubmitSuccess={onSubmitSuccess}/>

            <PresetFilterDialog
                title="Theatre Filters"
                description="Filter and sort theatres."
            >
                <ScrollArea className="max-h-[80vh]">
                    <ScrollBar/>
                    <TheatreQueryOptionFormContainer
                        presetValues={searchParams}
                    />
                </ScrollArea>
            </PresetFilterDialog>

            {pageContent}

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

export default TheatreIndexPageContent;
