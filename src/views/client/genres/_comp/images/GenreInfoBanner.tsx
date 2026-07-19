/**
 * @fileoverview Hero banner for the public-facing Genre detail page.
 */

import {ReactElement} from "react";
import {ChevronLeft} from "lucide-react";
import {Badge} from "@/views/common/_comp/ui";
import {HoverLink} from "@/views/common/_feat/navigation/HoverLink.tsx";
import {SROnly, SubsectionSubtitle, SubsectionTitle} from "@/views/common/_comp";

import {Genre} from "@/domains/genres";
import {GenreImageBanner} from "@/views/admin/genres/_comp";

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
                <HoverLink to="/browse/genres">
                    <ChevronLeft size={16}/> Genres
                </HoverLink>

                <section>
                    <SROnly text="Genre Details"/>
                    <SubsectionTitle as="h2" className="text-primary">{name}</SubsectionTitle>
                    <SubsectionSubtitle as="h3">Genre</SubsectionSubtitle>
                </section>

                <section>
                    <SROnly text="Genre Description"/>
                    <p className="primary-text text-xs lg:text-sm md:line-clamp-6 italic text-neutral-600">
                        {description}
                    </p>
                </section>

                <Badge variant="outline" className="w-fit px-4 py-1 select-none border-primary/20 bg-primary/5">
                    {movieCount} Movies
                </Badge>
            </div>
        </div>
    );
}
