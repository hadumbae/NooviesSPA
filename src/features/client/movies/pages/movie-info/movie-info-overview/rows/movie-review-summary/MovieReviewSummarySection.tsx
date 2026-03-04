/**
 * @file Section displaying movie reviews with submission controls.
 *
 * MovieReviewSummarySection.tsx
 */

import { cn } from "@/common/lib/utils.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import { SectionHeaderCSS } from "@/common/constants/css/TextCSS.ts";
import SubmitMovieReviewPopup from "@/features/client/movie-reviews/forms/submit-form/SubmitMovieReviewPopup.tsx";
import { ChevronRight, MessageCirclePlus } from "lucide-react";
import MovieReviewSubmitFormContainer
    from "@/features/client/movie-reviews/forms/submit-form/MovieReviewSubmitFormContainer.tsx";
import { Button } from "@/common/components/ui/button.tsx";
import { useState } from "react";
import { MovieReviewDetails } from "@/pages/review/schemas/models/MovieReview.types.ts";
import MovieReviewSummaryCard
    from "@/features/client/movie-reviews/cards/review-summary-card/MovieReviewSummaryCard.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import { MovieDetails } from "@/pages/movies/schema/movie/Movie.types.ts";

/**
 * Props for MovieReviewSummarySection.
 */
type RowProps = {
    /**
     * Movie associated with the reviews.
     */
    movie: MovieDetails;

    /**
     * Review authored by the current user, if present.
     */
    userReview: MovieReviewDetails | null;

    /**
     * Recent reviews to display.
     */
    reviews: MovieReviewDetails[];

    /**
     * Average rating for the movie.
     */
    averageRating: number | null;

    /**
     * Additional classes applied to the section.
     */
    className?: string;
};

/**
 * Renders the movie review summary section.
 */
const MovieReviewSummarySection = (
    { movie, userReview, reviews, className }: RowProps
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const onSubmit = () => setIsOpen(false);

    return (
        <section className={cn("space-y-4", className)}>
            <div className="flex justify-between items-center">
                <SectionHeader className={SectionHeaderCSS}>
                    Movie Reviews
                </SectionHeader>

                <MovieReviewSubmitFormContainer
                    movieID={movie._id}
                    onSubmitSuccess={onSubmit}
                >
                    <SubmitMovieReviewPopup
                        isHidden={!!userReview}
                        presetOpen={isOpen}
                        setPresetOpen={setIsOpen}
                    >
                        <Button variant="primary" size="icon" type="button">
                            <MessageCirclePlus />
                        </Button>
                    </SubmitMovieReviewPopup>
                </MovieReviewSubmitFormContainer>
            </div>

            {userReview && (
                <div className="space-y-4">
                    <PrimaryHeaderText>User Review</PrimaryHeaderText>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <MovieReviewSummaryCard
                            isUser={true}
                            review={userReview}
                        />
                    </div>
                </div>
            )}

            {reviews.length > 0 && (
                <div className="space-y-4">
                    <PrimaryHeaderText>
                        Most Recent Reviews
                    </PrimaryHeaderText>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reviews.map((review) => (
                            <MovieReviewSummaryCard
                                key={review._id}
                                review={review}
                            />
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <LoggedHoverLink to={`/browse/movies/${movie.slug}/reviews`}>
                            <ChevronRight /> More Reviews
                        </LoggedHoverLink>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MovieReviewSummarySection;