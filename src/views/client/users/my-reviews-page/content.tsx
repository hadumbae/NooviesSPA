/**
 * @fileoverview Presentational component for rendering the user's personal movie reviews layout and list.
 */

import {PageFlexWrapper} from "@/views/common/_comp/page";
import {PaginationRangeButtons} from "@/views/common/_comp";
import {EmptyArrayContainer} from "@/views/common/_comp/text-display/EmptyArrayContainer.tsx";
import {MovieReviewIndexCard} from "@/views/client/movie-reviews/_comp/index-card";
import {MyMovieReview} from "@/domains/movie-reviews/_schema/my-reviews";
import {ReactElement} from "react";
import {PageHeader} from "@/views/common/_comp";
import {MyProfileNavigation, MyProfileNavigationDropdown} from "@/views/client/users";
import {Separator} from "@/common/components/ui";
import {useIsMobile} from "@/common/_feat/handle-ui/useIsMobile.tsx";

/** Props for the MyReviewsPageContent component. */
type ContentProps = {
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    totalItems: number;
    reviews: MyMovieReview[];
}

/**
 * Renders the structural layout for the reviews list including headers and pagination controls.
 */
export function MyReviewsPageContent(
    {reviews, ...paginationProps}: ContentProps
): ReactElement {
    const isMobile = useIsMobile();

    return (
        <PageFlexWrapper>
            <PageHeader
                title="My Reviews"
                description="An Index Of All Your Reviews"
                actions={isMobile && <MyProfileNavigationDropdown />}
            />

            <Separator />

            {
                !isMobile &&
                <MyProfileNavigation/>
            }

            {
                reviews.length > 0 ? (
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {reviews.map(
                            (review) => (
                                <MovieReviewIndexCard
                                    key={review._id}
                                    review={review}
                                />
                            )
                        )}
                    </section>
                ) : (
                    <EmptyArrayContainer
                        text="You Have No Reviews"
                        className="flex-1"
                    />
                )
            }

            <PaginationRangeButtons {...paginationProps}/>
        </PageFlexWrapper>
    );
}