/**
 * @fileoverview Presentation component for the Theatre Index page content.
 */

import {ReactElement, useState} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {QueryFilterDialog} from "@/views/common/_feat/dialog/QueryFilterDialog.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {PaginationRangeButtons} from "@/views/common/_comp";
import {EmptyArrayContainer} from "@/views/common/_comp/text-display/EmptyArrayContainer.tsx";
import {useSetAdminPageTitle} from "@/common/_feat/handle-pages";

import {TheatreDetails, TheatreQueryOptionSchema} from "@/domains/theatres";
import {TheatreIndexCard} from "@/views/admin/theatres/_comp";
import {TheatreQueryOptionForm, TheatreQueryOptionFormView} from "@/views/admin/theatres/_feat";
import {TheatreIndexHeader} from "@/views/admin/theatres/_pages/index-page/header.tsx";

/** Props for the TheatreIndexPageContent component. */
type ContentProps = {
    theatres: TheatreDetails[];
    totalItems: number;
    page: number;
    perPage: number;
    setPage: (page: number) => void;
};

/**
 * Renders the primary grid layout and controls for managing theatres.
 */
export function TheatreIndexPageContent(
    {theatres, page, perPage, setPage, totalItems}: ContentProps
): ReactElement {
    useSetAdminPageTitle({presetTitle: "Theatre Index"});

    const {searchParams} = useParsedSearchParams({schema: TheatreQueryOptionSchema});
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <PageFlexWrapper>
            <TheatreIndexHeader/>

            <QueryFilterDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Theatre Filters"
                description="Filter and sort theatres."
            >
                <ScrollArea className="max-h-[80vh]">
                    <ScrollBar/>
                    <TheatreQueryOptionForm presetValues={searchParams}>
                        <TheatreQueryOptionFormView/>
                    </TheatreQueryOptionForm>
                </ScrollArea>
            </QueryFilterDialog>

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

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                totalItems={totalItems}
                setPage={setPage}
            />
        </PageFlexWrapper>
    );
}