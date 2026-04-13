/**
 * @fileoverview Defines the header for the Movie People listing page.
 * Provides breadcrumb navigation and a toggle mechanism to switch between
 * Cast and Crew views for a specific movie.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Link} from "react-router-dom";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import {RoleTypeDepartment} from "@/domains/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {MoviePersonListBreadcrumb} from "@/views/admin/movies/people-page/breadcrumb.tsx";

type HeaderProps = {
    movie: Movie;
    department: RoleTypeDepartment;
};

/**
 * Renders the administrative header for movie personnel lists.
 */
export function MoviePeopleHeader({movie, department}: HeaderProps) {
    const {slug, title} = movie;
    const parsedType = convertToTitleCase(department);

    const isCrew = department === "CREW";
    const isCast = department === "CAST";

    return (
        <header className="space-y-2">
            <MoviePersonListBreadcrumb movie={movie} department={department} />

            <div className={cn(
                "flex",
                "max-md:flex-col max-md:space-y-5",
                "md:justify-between md:items-center"
            )}>
                <section>
                    <HeaderTitle>{title}</HeaderTitle>
                    <HeaderDescription>{parsedType}</HeaderDescription>
                </section>

                <nav className="flex space-x-2 items-center max-md:justify-center md:justify-end">
                    <Link
                        to={`/admin/movies/get/${slug}/people/crew`}
                        className={cn(
                            buttonVariants({variant: isCrew ? "outline" : "link"}),
                            PrimaryTextBaseCSS,
                            !isCrew && "text-neutral-400"
                        )}
                    >
                        Crew
                    </Link>

                    <Link
                        to={`/admin/movies/get/${slug}/people/cast`}
                        className={cn(
                            buttonVariants({variant: isCast ? "outline" : "link"}),
                            PrimaryTextBaseCSS,
                            !isCast && "text-neutral-400"
                        )}
                    >
                        Cast
                    </Link>
                </nav>
            </div>
        </header>
    );
}