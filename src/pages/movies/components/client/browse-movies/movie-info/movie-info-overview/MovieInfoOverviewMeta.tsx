/**
 * @file MovieInfoOverviewMeta.tsx
 * @description
 * Displays high-level metadata for a movie, including genre navigation,
 * original title, tagline, and synopsis.
 *
 * The component is responsive:
 * - Genre links are horizontally scrollable.
 * - Technical details are hidden on small screens.
 */
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import LinkGroup from "@/common/components/LinkGroup.tsx";
import {PillCSS} from "@/common/constants/css/ContainerCSS.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import generateGenreLinkConfigs from "@/pages/genres/utilities/navigation/generateGenreLinkConfigs.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";

/**
 * Props for {@link MovieInfoOverviewMeta}.
 */
type OverviewProps = {
    /** Optional wrapper class name */
    className?: string;
    /** Full movie details used to derive overview metadata */
    movie: MovieDetails;
};

/**
 * Renders the movie overview metadata section.
 *
 * @param props - {@link OverviewProps}
 * @returns A responsive movie overview metadata block
 *
 * @example
 * ```tsx
 * <MovieInfoOverviewMeta movie={movie} />
 * ```
 */
const MovieInfoOverviewMeta = ({className, movie}: OverviewProps) => {
    const {originalTitle, tagline, genres, synopsis} = movie;
    const genreLinks = generateGenreLinkConfigs(genres);

    return (
        <div className={className}>
            <nav>
                <ScrollArea>
                    <LinkGroup links={genreLinks} className={PillCSS}/>
                    <ScrollBar orientation="horizontal"/>
                </ScrollArea>
            </nav>

            <section className="max-md:hidden space-y-1">
                <SectionHeader srOnly={true}>Technical Details</SectionHeader>

                {
                    originalTitle &&
                    <LabeledGroup label="Original Title">
                        <span className="text-sm">{originalTitle}</span>
                    </LabeledGroup>
                }

                <LabeledGroup label="Tagline">
                    <span className="text-sm">
                        {tagline}
                    </span>
                </LabeledGroup>
            </section>

            <p className={cn(PrimaryTextBaseCSS, "text-sm")}>
                {synopsis}
            </p>
        </div>
    );
};

export default MovieInfoOverviewMeta;
