/**
 * @fileoverview Hero banner for the public-facing Genre detail page.
 */
import {ChevronLeft} from "lucide-react";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {cn} from "@/common/lib/utils.ts";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {Badge} from "@/common/components/ui/badge.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {Genre} from "@/domains/genres/schema";
import {GenreImageBanner} from "@/views/admin/genres/_comp";
import {ReactElement} from "react";

/** Props for the GenreInfoBanner component. */
type BannerProps = {
    genre: Genre;
};

/** Visual header component for the genre information page. */
export function GenreInfoBanner({genre}: BannerProps): ReactElement {
    const {name, description, movieCount, image} = genre;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <GenreImageBanner
                className="w-full max-md:h-52 md:h-72"
                image={image}
                genreName={name}
            />

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
}
