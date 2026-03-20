/**
 * @file Metadata section for the movie overview layout.
 *
 * MovieOverviewMeta.tsx
 */

import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import LinkGroup from "@/common/components/LinkGroup.tsx";
import {PillCSS} from "@/common/constants/css/ContainerCSS.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import generateGenreLinkConfigs from "@/domains/genres/utilities/navigation/generateGenreLinkConfigs.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";

/**
 * Props for MovieOverviewMeta.
 */
type OverviewProps = {
    /**
     * Optional wrapper classes.
     */
    className?: string;

    /**
     * Movie used to derive metadata.
     */
    movie: MovieDetails;
};

/**
 * Renders movie overview metadata.
 */
const MovieOverviewMeta = ({className, movie}: OverviewProps) => {
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

export default MovieOverviewMeta;
