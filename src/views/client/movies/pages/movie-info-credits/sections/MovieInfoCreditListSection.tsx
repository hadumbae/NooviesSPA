/**
 * @fileoverview Section component that displays a list of movie credits categorized by their role.
 */

import {ReactElement} from "react";
import {MovieCreditInfoList} from "@/views/client/movie-credits/_comp";
import {CreditDisplayOrderCategory, CreditExceptMovie} from "@/domains/moviecredit";
import {PageSectionHeader} from "@/views/common/_comp/page";

/** Props for the MovieInfoCreditListSection component. */
type SectionProps = {
    category: CreditDisplayOrderCategory;
    credits: CreditExceptMovie[];
};

/** Renders a titled section containing a list of credits for a specific category. */
export function MovieInfoCreditListSection(
    {category, credits}: SectionProps
): ReactElement {
    return (
        <section className="space-y-4">
            <PageSectionHeader text={category}/>
            <MovieCreditInfoList hideAvatar={true} credits={credits}/>
        </section>
    );
}
