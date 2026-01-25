/**
 * @file TheatreShowingSelectSummary.tsx
 *
 * Compact summary component for a single theatre showing.
 *
 * Used within theatre browse lists to allow quick inspection
 * and selection of individual showings.
 */

import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import {cn} from "@/common/lib/utils.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PosterImage from "@/pages/movies/components/images/PosterImage.tsx";
import {formatShowingInfo} from "@/pages/showings/utilities/formatShowingInfo.ts";
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

/**
 * Props for {@link TheatreShowingSelectSummary}.
 */
type SummaryProps = {
    /** Fully populated showing details */
    showing: ShowingDetails;

    /** Optional container class overrides */
    className?: string;
};

const ICON_CSS = cn(IconTextCSS, "max-md:text-sm select-none");

/**
 * Displays a concise, selectable summary of a single showing.
 *
 * Includes:
 * - Movie poster and title
 * - Runtime and format metadata
 * - Language and subtitle indicators
 * - Start time and selection action
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
                <PosterImage src={posterImage?.secure_url} className="h-44"/>
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
