import {MovieReviewDetails} from "@/pages/review/schemas/models/MovieReview.types.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {SectionHeaderCSS} from "@/common/constants/css/TextCSS.ts";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import MovieReviewDetailsCard from "@/features/client/movie-reviews/cards/review-card/MovieReviewDetailsCard.tsx";

type SectionProps = {
    reviews: MovieReviewDetails[];
    page: number;
    perPage: number;
    totalItems: number;
    setPage: (page: number) => void;
}

const MovieInfoReviewListSection = (
    {reviews, ...paginationProps}: SectionProps
) => {
    return (
        <section className="space-y-4">
            <SectionHeader className={SectionHeaderCSS}>
                Reviews
            </SectionHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {reviews.map(review => (
                    <MovieReviewDetailsCard
                        key={review._id}
                        review={review}
                        isHighlighted={false}
                        isUser={review.isUserReview}
                    />
                ))}
            </div>

            <PaginationRangeButtons
                {...paginationProps}
            />
        </section>
    );
};

export default MovieInfoReviewListSection;
