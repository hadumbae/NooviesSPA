/**
 * @fileoverview Content layout for the admin showings index page.
 *
 */

import {ReactElement} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

import {ShowingIndexListDialog} from "@/views/admin/showings/_comp";
import {ShowingDetails} from "@/domains/showings";
import {ShowingIndexHeader} from "@/views/admin/showings/_pages/index-page/header.tsx";

/** Props for the ShowingIndexPageContent component. */
type ContentProps = {
    showings: ShowingDetails[];
    totalItems: number;
    page: number;
    perPage: number;
    setPage: (page: number) => void;
};

/** Displays a paginated grid of showings for the admin index page. */
export function ShowingIndexPageContent(
    {showings, totalItems, page, perPage, setPage}: ContentProps
): ReactElement {
    return (
        <PageFlexWrapper>
            <ShowingIndexHeader/>

            {
                showings.length > 0 ? (
                    <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2">
                        {showings.map((showing) => (
                            <ShowingIndexListDialog
                                key={showing._id}
                                showing={showing}
                            />
                        ))}
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
                totalItems={totalItems}
                setPage={setPage}
            />
        </PageFlexWrapper>
    );
}
