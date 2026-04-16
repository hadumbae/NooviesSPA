/**
 * @file Hero banner component for the public-facing Genre detail page.
 * @filename GenreInfoBanner.tsx
 */

import {ChevronLeft, Image} from "lucide-react";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {cn} from "@/common/lib/utils.ts";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {Badge} from "@/common/components/ui/badge.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {Genre} from "@/domains/genres/schema";

/**
 * Props for the {@link GenreInfoBanner} component.
 */
type BannerProps = {
    /** The genre entity containing the name, description, and movie count to display. */
    genre: Genre;
};

/**
 * Renders a prominent visual header for the genre info page.
 * @param props - Component {@link BannerProps}.
 */
const GenreInfoBanner = ({genre}: BannerProps) => {
    const {name, description, movieCount} = genre;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className={cn(
                "bg-gray-400 max-md:h-52 md:h-72",
                "flex justify-center items-center",
            )}>
                <Image className="text-white/50"/>
            </div>

            <div className="flex flex-col justify-center space-y-3 p-1">
                <LoggedHoverLink to="/browse/genres">
                    <ChevronLeft size={16}/> Genres
                </LoggedHoverLink>

                <section>
                    <SectionHeader srOnly={true}>Genre Details</SectionHeader>
                    <PrimaryHeaderText as="h2" className="text-primary">{name}</PrimaryHeaderText>
                    <SecondaryHeaderText as="h3">Genre</SecondaryHeaderText>
                </section>

                <section>
                    <SectionHeader srOnly={true}>Genre Description</SectionHeader>

                    <p className={cn(
                        PrimaryTextBaseCSS,
                        "text-xs lg:text-sm md:line-clamp-6 italic text-neutral-600",
                    )}>
                        {description}
                    </p>
                </section>

                <Badge
                    variant="outline"
                    className="w-fit px-4 py-1 select-none border-primary/20 bg-primary/5"
                >
                    {movieCount} Movies
                </Badge>
            </div>
        </div>
    );
};

export default GenreInfoBanner;