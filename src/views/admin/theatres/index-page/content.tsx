/**
 * @fileoverview Presentation component for the Theatre Index page.
 * Orchestrates the administrative interface for theater management, including
 * responsive grid layouts, search/filter dialogs, and pagination.
 */

import TheatreIndexCard from "@/views/admin/theatres/_comp/index-page/TheatreIndexCard.tsx";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {TheatreIndexHeader} from "@/views/admin/theatres/index-page/header.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import TheatreQueryOptionFormContainer
    from "@/views/admin/theatres/_feat/update-query-options/TheatreQueryOptionFormContainer.tsx";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {TheatreQueryOptionSchema} from "@/domains/theatres/_feat/handle-query-options/TheatreQueryOption.schema.ts";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {ReactElement} from "react";

import {TheatreDetails} from "@/domains/theatres/schema/theatre/TheatreDetailsSchema.ts";

type ContentProps = {
    theatres: TheatreDetails[];
    totalItems: number;
    page: number;
    perPage: number;
    setPage: (page: number) => void;
};

/**
 * Renders the main theatre management listing.
 */
export function TheatreIndexPageContent(
    {theatres, page, perPage, setPage, totalItems}: ContentProps
): ReactElement {
    const {searchParams} = useParsedSearchParams({schema: TheatreQueryOptionSchema});

    return (
        <PageFlexWrapper>
            <TheatreIndexHeader/>

            <PresetFilterDialog title="Theatre Filters" description="Filter and sort theatres.">
                <ScrollArea className="max-h-[80vh]">
                    <ScrollBar/>
                    <TheatreQueryOptionFormContainer presetValues={searchParams}/>
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
}