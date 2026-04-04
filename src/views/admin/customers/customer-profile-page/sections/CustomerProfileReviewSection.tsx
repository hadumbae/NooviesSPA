// CustomerProfileReviewSection.tsx

import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {MovieReviewWithMovie} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {PageSectionHeader} from "@/common/components/page/PageSectionHeader.tsx";

type SectionProps = {
    code: UserUniqueCode;
    itemCount: number;
    reviews: MovieReviewWithMovie[];
};

export const CustomerProfileReviewSection = (
    {code, itemCount, reviews}: SectionProps
) => {
    return (
        <section>
            <PageSectionHeader text={`Reviews (${itemCount})`} />

            <div className="grid grid-cols-1 gap-4">
                {reviews.map((review) => <div key={review._id}>{review._id}</div>)}
            </div>
        </section>
    );
};