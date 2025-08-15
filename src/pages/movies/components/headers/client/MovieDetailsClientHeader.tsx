import {FC} from 'react';
import {format} from "date-fns";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Link, useLocation} from "react-router-dom";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {TableOfContents} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";

interface headerProps {
    movie: Movie;
}

const MovieDetailsClientHeader: FC<headerProps> = ({movie}) => {
    const {title, releaseDate} = movie;
    const formattedReleaseDate = format(releaseDate, "yyyy");

    const {search, hash} = useLocation();
    const locationDesc = {
        pathname: "/browse/movies",
        search,
        hash,
    };

    return (
        <header className="flex justify-between items-center">
            <section>
                <HeaderTitle className="text-xl">{title}</HeaderTitle>
                <HeaderDescription>{formattedReleaseDate}</HeaderDescription>
            </section>

            <section>
                <Link
                    to={locationDesc}
                    className={cn(buttonVariants({variant: "link"}), "text-neutral-400 hover:text-black")}
                >
                    <TableOfContents/> Browse
                </Link>
            </section>
        </header>
    );
};

export default MovieDetailsClientHeader;
