/**
 * @file GenreInfoBanner.tsx
 * @description
 * Banner component for the genre detail page.
 * Displays a visual placeholder, genre metadata,
 * and navigation back to the genre list.
 */

import {GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import {ChevronLeft, Image} from "lucide-react";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {cn} from "@/common/lib/utils.ts";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {Badge} from "@/common/components/ui/badge.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";

/**
 * Props for {@link GenreInfoBanner}.
 */
type BannerProps = {
    /**
     * Detailed genre data used to populate the banner.
     */
    genre: GenreDetails;
};

/**
 * Renders a genre information banner including:
 * - A visual image placeholder
 * - Genre name and description
 * - Movie count badge
 * - Logged navigation back to the genre list
 *
 * Includes screen-reader–only section headers
 * for improved accessibility.
 *
 * @param props - Component props.
 *
 * @example
 * ```tsx
 * <GenreInfoBanner genre={genre} />
 * ```
 */
const GenreInfoBanner = ({genre}: BannerProps) => {
    const {name, description, movieCount} = genre;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Genre Image */}
            <div
                className={cn(
                    "bg-gray-400 max-md:h-52 md:h-72",
                    "flex justify-center items-center",
                )}
            >
                <Image/>
            </div>

            {/* Genre Details */}
            <div className="flex flex-col justify-center space-y-3 p-1">
                <LoggedHoverLink to="/browse/genres">
                    <ChevronLeft/> Genres
                </LoggedHoverLink>

                <section>
                    <SectionHeader srOnly={true}>Genre Details</SectionHeader>

                    <PrimaryHeaderText as="h2" className="text-primary">
                        {name}
                    </PrimaryHeaderText>
                    <SecondaryHeaderText as="h3">
                        Genre
                    </SecondaryHeaderText>
                </section>

                <section>
                    <SectionHeader srOnly={true}>Genre Description</SectionHeader>

                    <p
                        className={cn(
                            PrimaryTextBaseCSS,
                            "text-xs lg:text-sm md:line-clamp-6",
                        )}
                    >
                        {description}
                    </p>
                </section>

                <Badge
                    variant="outline"
                    className="w-fit px-4 py-1 select-none"
                >
                    {movieCount} Movies
                </Badge>
            </div>
        </div>
    );
};

export default GenreInfoBanner;
