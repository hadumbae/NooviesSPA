/**
 * @file MovieEditorialInfoRow.tsx
 * @description
 * Displays editorial movie information, including titles, tagline,
 * genres, and synopsis, in a structured, labeled layout.
 *
 * Intended for detail or editorial sections where full descriptive
 * context is required.
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
 * Props for {@link MovieEditorialInfoRow}.
 */
type RowProps = {
    /** Full movie details used to render editorial information */
    movie: MovieDetails;
};

/**
 * Renders a labeled, editorial-style breakdown of movie details.
 *
 * @param props - {@link RowProps}
 * @returns A section containing movie titles, genres, and synopsis
 */
const MovieEditorialInfoRow = ({movie}: RowProps) => {
    const {title, originalTitle, synopsis, tagline, genres} = movie;

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
                {/*Title*/}

                <LabeledGroup label="Title">
                    <span className={textualCSS}>
                        {title}
                    </span>
                </LabeledGroup>

                <Separator/>

                {/*Original Title*/}

                {
                    originalTitle &&
                    <>
                        <LabeledGroup label="Also Known As">
                            <span className={textualCSS}>
                                {originalTitle}
                            </span>
                        </LabeledGroup>

                        <Separator/>
                    </>
                }

                {/*Tagline*/}

                {
                    tagline &&
                    <>
                        <LabeledGroup label="Tagline">
                            <span className={textualCSS}>
                                {tagline}
                            </span>
                        </LabeledGroup>

                        <Separator/>
                    </>
                }

                {/*Genres*/}

                <LabeledGroup label="Genres">
                    <LinkGroup links={genreLinks} className="px-2"/>
                </LabeledGroup>

                <Separator/>

                {/*Synopsis*/}

                <LabeledGroup label="Synopsis" className="items-start">
                    <p className={textualCSS}>
                        {synopsis}
                    </p>
                </LabeledGroup>
            </div>
        </section>
    );
};

export default MovieEditorialInfoRow;
