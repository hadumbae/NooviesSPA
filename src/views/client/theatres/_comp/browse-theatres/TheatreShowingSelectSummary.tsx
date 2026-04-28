/**
 * @file Compact selectable summary for a single theatre showing.
 * @filename TheatreShowingSelectSummary.tsx
 */

import {cn} from "@/common/lib/utils.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {formatShowingInfo} from "@/domains/showings/utilities/formatShowingInfo.ts";
import {
    IconTextCSS,
    PrimaryTextBaseCSS,
    SecondaryTextBaseCSS,
} from "@/common/constants/css/TextCSS.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import buildString from "@/common/utility/buildString.ts";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {Captions, Volume2} from "lucide-react";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {PopulatedShowing} from "@/domains/showings/schema/showing/PopulatedShowingSchema.ts";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image";

/**
 * Props for {@link TheatreShowingSelectSummary}.
 */
type SummaryProps = {
    /** {@link PopulatedShowing} | {@link ShowingDetails} */
    showing: PopulatedShowing | ShowingDetails;

    /** Container style overrides. */
    className?: string;
};

/** Derived from {@link IconTextCSS}. */
const ICON_CSS = cn(IconTextCSS, "max-md:text-sm select-none");

/**
 * Selection card using {@link formatShowingInfo} for data normalization.
 */
const TheatreShowingSelectSummary = (
    {showing, className}: SummaryProps,
) => {
    const {
        movieSlug,
        showingSlug,
        spokenLanguage,
        subtitles,
        formattedMovieTitle,
        posterImage,
        formattedRunTime,
        formattedType,
        formattedStartTime,
    } = formatShowingInfo(showing);

    const formattedMeta = buildString(
        [formattedRunTime, formattedType],
        " • ",
    );

    return (
        <div className={cn("flex space-x-3", className)}>
            <section>
                <SectionHeader srOnly>Poster Image</SectionHeader>
                <MoviePosterImage src={posterImage?.secure_url} className="h-44"/>
            </section>

            <div className="flex-1 flex flex-col justify-between space-y-2">
                <section>
                    <SectionHeader srOnly>Movie Meta</SectionHeader>

                    <LoggedLink to={`/browse/movies/${movieSlug}`} className={cn(
                        PrimaryTextBaseCSS,
                        "font-bold hover:underline underline-offset-4",
                        "max-md:text-sm",
                    )}>
                        {formattedMovieTitle}
                    </LoggedLink>

                    <SecondaryHeaderText className="max-md:text-sm">
                        {formattedMeta}
                    </SecondaryHeaderText>
                </section>

                <section className="flex-1 flex flex-col space-y-2 text-sm">
                    <span className={ICON_CSS}>
                        <Volume2/> {spokenLanguage}
                    </span>

                    <span className={ICON_CSS}>
                        <Captions/> {subtitles}
                    </span>
                </section>

                <section className="flex justify-between items-center">
                    <span className={cn(SecondaryTextBaseCSS, "text-sm")}>
                        {formattedStartTime}
                    </span>

                    <ButtonLink
                        to={`/browse/showings/${showingSlug}`}
                        type="button"
                        variant="primary"
                        size="sm"
                        className="uppercase"
                    >
                        Select
                    </ButtonLink>
                </section>
            </div>
        </div>
    );
};

export default TheatreShowingSelectSummary;