/**
 * @file Editorial information section for a movie detail page.
 *
 * MovieOverviewEditorialInfo.tsx
 */

import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import generateGenreLinkConfigs from "@/pages/genres/utilities/navigation/generateGenreLinkConfigs.ts";
import LinkGroup from "@/common/components/LinkGroup.tsx";
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS, SectionHeaderCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for MovieOverviewEditorialInfo.
 */
type RowProps = {
    /**
     * Movie details used to render editorial information.
     */
    movie: MovieDetails;
};

/**
 * Renders a labeled breakdown of editorial movie details.
 */
const MovieOverviewEditorialInfo = ({movie}: RowProps) => {
    const {
        title,
        originalTitle,
        synopsis,
        tagline,
        genres
    } = movie;

    const genreLinks = generateGenreLinkConfigs(genres);

    const textualCSS = cn(
        PrimaryTextBaseCSS,
        "text-sm",
    );

    return (
        <section className="space-y-4">
            <SectionHeader className={SectionHeaderCSS}>
                Movie Story And Details
            </SectionHeader>

            <div className="space-y-2">
                <LabeledGroup label="Title">
                    <span className={textualCSS}>{title}</span>
                </LabeledGroup>

                <Separator/>

                {originalTitle && (<>
                    <LabeledGroup label="Also Known As">
                        <span className={textualCSS}>{originalTitle}</span>
                    </LabeledGroup>
                    <Separator/>
                </>)}

                {tagline && (<>
                    <LabeledGroup label="Tagline">
                        <span className={textualCSS}>{tagline}</span>
                    </LabeledGroup>
                    <Separator/>
                </>)}

                <LabeledGroup label="Genres">
                    <LinkGroup links={genreLinks} className="px-2"/>
                </LabeledGroup>

                <Separator/>

                <LabeledGroup label="Synopsis" className="items-start">
                    <p className={textualCSS}>{synopsis}</p>
                </LabeledGroup>
            </div>
        </section>
    );
};

export default MovieOverviewEditorialInfo;