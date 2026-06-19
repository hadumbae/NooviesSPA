/**
 * @fileoverview Section component that displays a list of movie credits categorized by their role.
 */

import { SectionHeaderCSS } from "@/common/constants/css/TextCSS.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {
    MovieCreditInfoList
} from "@/views/client/movie-credits/_comp/credit-info-list/MovieCreditInfoList.tsx";
import {
    CreditDisplayOrderCategory
} from "@/domains/moviecredit/constants/CreditCategoryDisplayOrderConstant.ts";
import { ReactElement } from "react";
import {CreditExceptMovie} from "@/domains/moviecredit";

/** Props for the MovieInfoCreditListSection component. */
type SectionProps = {
    category: CreditDisplayOrderCategory;
    credits: CreditExceptMovie[];
};

/** Renders a titled section containing a list of credits for a specific category. */
export function MovieInfoCreditListSection(
    { category, credits }: SectionProps
): ReactElement {
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
}
