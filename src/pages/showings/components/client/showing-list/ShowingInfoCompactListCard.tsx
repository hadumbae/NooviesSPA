/**
 * @file ShowingInfoCompactListCard.tsx
 *
 * Compact list-style card for displaying key Showing information.
 *
 * @remarks
 * Designed for dense browsing views (e.g. showing lists, search results).
 * Uses {@link formatShowingInfo} to transform domain data into
 * UI-ready display fields.
 *
 * Responsibilities:
 * - Display movie poster and title
 * - Show runtime, format type, language, and subtitles
 * - Present localized showing start time
 * - Provide navigation to movie and showing detail pages
 */

import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PosterImage from "@/pages/movies/components/images/PosterImage.tsx";
import buildString from "@/common/utility/buildString.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import {cn} from "@/common/lib/utils.ts";
import {IconTextCSS, SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {Captions, TvMinimal, Volume2} from "lucide-react";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {formatShowingInfo} from "@/pages/showings/utilities/formatShowingInfo.ts";

/**
 * Props for {@link ShowingInfoCompactListCard}.
 */
type CardProps = {
    /** Full showing details used to derive display information. */
    showing: ShowingDetails;
};

/**
 * Renders a compact card summarizing a
 * single Showing for client side browsing.
 *
 * @param props - Component props.
 * @returns A compact, interactive card suitable for list views.
 */
const ShowingInfoCompactListCard = ({showing}: CardProps) => {
    const {
        theatreName,
        theatreSlug,
        screenName,
        formattedMovieTitle,
        posterImage,
        movieSlug,
        showingSlug,
        formattedType,
        formattedRunTime,
        spokenLanguage,
        subtitles,
        formattedStartTime,
    } = formatShowingInfo(showing);

    const formattedMeta = buildString(
        [formattedRunTime, formattedType],
        " • "
    );

    return (
        <Card>
            <CardHeader className="py-4">
                <CardTitle>
                    <LoggedLink
                        to={`/browse/theatres/${theatreSlug}`}
                        className="hover:underline underline-offset-4"
                    >
                        {theatreName}
                    </LoggedLink>
                </CardTitle>
                <CardDescription className={IconTextCSS}>
                    <TvMinimal /> {screenName}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0 flex items-stretch space-x-2">
                <section>
                    <SectionHeader srOnly={true}>
                        Movie Poster Image
                    </SectionHeader>

                    <PosterImage
                        src={posterImage?.secure_url}
                        className="h-48"
                    />
                </section>

                <div className="flex-1 flex flex-col space-y-3">
                    <section>
                        <SectionHeader srOnly={true}>Movie Meta</SectionHeader>

                        <LoggedLink
                            to={`/browse/movies/${movieSlug}`}
                            className="hover:underline hover:underline-offset-4"
                        >
                            {formattedMovieTitle}
                        </LoggedLink>

                        <SecondaryHeaderText className="text-sm">
                            {formattedMeta}
                        </SecondaryHeaderText>
                    </section>

                    <section className="flex-1 flex flex-col space-y-2 text-sm">
                        <span className={IconTextCSS}>
                            <Volume2/> {spokenLanguage}
                        </span>

                        <span className={IconTextCSS}>
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
                            className="uppercase"
                            size="sm"
                        >
                            Select
                        </ButtonLink>
                    </section>
                </div>
            </CardContent>
        </Card>
    );
};

export default ShowingInfoCompactListCard;
