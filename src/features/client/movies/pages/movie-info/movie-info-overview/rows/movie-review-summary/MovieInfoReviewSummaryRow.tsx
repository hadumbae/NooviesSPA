/**
 * @file Movie review summary row.
 * MovieInfoReviewSummaryRow.ts
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {cn} from "@/common/lib/utils.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {SectionHeaderCSS} from "@/common/constants/css/TextCSS.ts";
import SubmitMovieReviewPopup from "@/features/client/movie-reviews/forms/submit-form/SubmitMovieReviewPopup.tsx";
import {MessageCirclePlus} from "lucide-react";
import MovieReviewSubmitFormContainer
    from "@/features/client/movie-reviews/forms/submit-form/MovieReviewSubmitFormContainer.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {useState} from "react";
import {PopulatedMovieReview} from "@/pages/review/schemas/models/MovieReview.types.ts";

/**
 * Props for movie review summary row.
 */
type RowProps = {
    movieID: ObjectId;
    reviews: PopulatedMovieReview[];
    totalItems: number;
    page: number;
    setPage: (page: number) => void;
}

/**
 * Displays review summary with submission entry point.
 */
const MovieInfoReviewSummaryRow = (
    {movieID}: RowProps
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const onSubmit = () => setIsOpen(false);

    return (
        <section className={cn("space-y-4")}>
            <div className="flex justify-between items-center">
                <SectionHeader className={SectionHeaderCSS}>Movie Reviews</SectionHeader>

                <MovieReviewSubmitFormContainer movieID={movieID} onSubmitSuccess={onSubmit}>
                    <SubmitMovieReviewPopup presetOpen={isOpen} setPresetOpen={setIsOpen}>
                        <Button variant="primary" size="icon" type="button">
                            <MessageCirclePlus/>
                        </Button>
                    </SubmitMovieReviewPopup>
                </MovieReviewSubmitFormContainer>
            </div>
        </section>
    );
};

export default MovieInfoReviewSummaryRow;