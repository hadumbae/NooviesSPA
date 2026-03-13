/**
 * @file Section component for rendering a grouped movie credit category.
 * @filename MovieInfoCreditListSection.tsx
 */

import {
    CreditExceptMovie,
} from "@/domains/moviecredit/schemas/model/credit-except-schemas/CreditExceptMovie.types.ts";
import { SectionHeaderCSS } from "@/common/constants/css/TextCSS.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MovieCreditInfoList from "@/features/client/movie-credits/components/lists/MovieCreditInfoList.tsx";
import {
    CreditDisplayOrderCategory
} from "@/domains/moviecredit/constants/CreditCategoryDisplayOrderConstant.ts";

/**
 * Props for {@link MovieInfoCreditListSection}.
 */
type SectionProps = {
    /**
     * Credit category label displayed as the section header.
     */
    category: CreditDisplayOrderCategory;

    /**
     * Credits belonging to the section category.
     */
    credits: CreditExceptMovie[];
};

/**
 * Renders a movie credit section grouped by category.
 *
 * Displays a header and the corresponding list of credits.
 */
const MovieInfoCreditListSection = (
    { category, credits }: SectionProps
) => {
    return (
        <section className="space-y-4">
            <SectionHeader className={SectionHeaderCSS}>
                {category}
            </SectionHeader>

            <MovieCreditInfoList
                hideAvatar={true}
                credits={credits}
            />
        </section>
    );
};

export default MovieInfoCreditListSection;