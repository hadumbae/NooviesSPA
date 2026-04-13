/**
 * @fileoverview Presentation component for the Theatre Index page.
 * Orchestrates the administrative interface for theater management, including
 * responsive grid layouts, search/filter dialogs, and pagination.
 */

import TheatreIndexCard from "@/domains/theatres/components/admin/pages/theatre-index/TheatreIndexCard.tsx";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import TheatreIndexHeader from "@/domains/theatres/components/admin/pages/theatre-index/TheatreIndexHeader.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import TheatreQueryOptionFormContainer
    from "@/domains/theatres/components/admin/form/theatre-query-option/TheatreQueryOptionFormContainer.tsx";
import {Theatre, TheatreDetails} from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {TheatreQueryOptionSchema} from "@/domains/theatres/schema/queries/TheatreQueryOption.schema.ts";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import useNavigateToTheatre from "@/domains/theatres/hooks/navigation/navigate-to-theatre/useNavigateToTheatre.ts";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

export type TheatreIndexPageContentProps = {
    theatres: TheatreDetails[];
    totalItems: number;
    page: number;
    perPage: number;
    setPage: (page: number) => void;
};

/**
 * Renders the main theatre management listing.
 * Combines URL-driven filter states with paginated results and provides
 * navigation logic for theater creation or selection.
 */
const TheatreIndexPageContent = (
    {theatres, page, perPage, setPage, totalItems}: TheatreIndexPageContentProps
) => {
    const {searchParams} = useParsedSearchParams({schema: TheatreQueryOptionSchema});

    const navigateToTheatre = useNavigateToTheatre();

    const onSubmitSuccess = (theatre: Theatre) => {
        navigateToTheatre({
            slug: theatre.slug,
            component: TheatreIndexPageContent.name,
            message: "Navigation to theatre profile after submission."
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

            {theatres.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {theatres.map((theatre) => (
                        <TheatreIndexCard
                            key={theatre._id}
                            theatre={theatre}
                        />
                    ))}
                </div>
            ) : (
                <EmptyArrayContainer
                    className="flex-1"
                    text="There are no theatres."
                />
            )}

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