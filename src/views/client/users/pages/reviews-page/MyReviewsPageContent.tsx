/**
 * @file Presentational component for rendering the "My Reviews" layout and list.
 * @filename MyReviewsPageContent.tsx
 */

import {PageFlexWrapper} from "@/views/common/_comp/page";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import MyReviewsPageHeader from "@/views/client/users/pages/reviews-page/header/MyReviewsPageHeader.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {MovieReviewIndexCard} from "@/views/client/movie-reviews/components/cards/index-card";
import {MyMovieReview} from "@/domains/review/schemas/models/my-reviews";

/**
 * Props for the {@link MyReviewsPageContent} component.
 */
type ContentProps = {
    /** The currently active page number. */
    page: number;
    /** Number of review items displayed per page. */
    perPage: number;
    /** Callback to update the active page. */
    setPage: (page: number) => void;
    /** Global count of all reviews belonging to the user. */
    totalItems: number;
    /** The subset of reviews to render for the current page. */
    reviews: MyMovieReview[];
}

/**
 * Renders the structural layout for the reviews list, including headers and pagination controls.
 * @param props - Component {@link ContentProps}.
 */
const MyReviewsPageContent = (
    {reviews, ...paginationProps}: ContentProps
) => {
    return (
        <PageFlexWrapper>
            <MyReviewsPageHeader/>

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
};

export default MyReviewsPageContent;