/**
 * @fileoverview Compact selectable summary component for a single theatre showing.
 */

import {cn} from "@/common/lib/utils.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {formatShowingInfo} from "@/domains/showings/_feat/formatters/formatShowingInfo.ts";
import {IconTextCSS} from "@/common/constants/css/TextCSS.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import buildString from "@/common/utility/buildString.ts";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {Captions, Volume2} from "lucide-react";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {PopulatedShowing} from "@/domains/showings/schema/showing/PopulatedShowingSchema.ts";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {ReactElement} from "react";

const ICON_CSS = cn(IconTextCSS, "max-md:text-xs font-bold select-none");

/** Props for the TheatreShowingSelectSummary component. */
type SummaryProps = {
    showing: PopulatedShowing | ShowingDetails;
    className?: string;
};

/**
 * Displays a summary of a movie showing including poster, metadata, and language options.
 */
export function TheatreShowingSelectSummary(
    {showing, className}: SummaryProps,
): ReactElement {
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
        <div className={cn("flex", className)}>
            <section>
                <SectionHeader srOnly>Poster Image</SectionHeader>
                <MoviePosterImage
                    url={posterImage?.secure_url}
                    className="h-44 rounded-r-none"
                />
            </section>

            <div className="flex-1 flex flex-col justify-between space-y-2 py-2 px-4">
                <section>
                    <SROnly text="Movie Meta"/>

                    <LoggedLink
                        to={`/browse/movies/${movieSlug}`}
                        className={cn(
                            "primary-text font-bold max-md:text-sm",
                            "hover:underline underline-offset-4 line-clamp-2",
                        )}
                    >
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
                    <span className="secondary-text text-sm">
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
}

