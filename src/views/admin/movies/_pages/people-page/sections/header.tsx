/**
 * @fileoverview Header component for the movie personnel administration page.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {buttonVariants} from "@/common/components/ui";
import {cn} from "@/common/lib/utils.ts";
import {MoviePersonListBreadcrumb} from "@/views/admin/movies/_pages/people-page/sections/breadcrumb.tsx";

import {RoleTypeDepartment} from "@/domains/roletype";
import {Movie} from "@/domains/movies";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/** Props for the MoviePeopleHeader component. */
type HeaderProps = {
    movie: Movie;
    department: RoleTypeDepartment;
};

/**
 * Administrative header for movie personnel lists providing navigation between cast and crew.
 */
export function MoviePeopleHeader({movie, department}: HeaderProps) {
    const {slug, title} = movie;
    const parsedType = convertToTitleCase(department);

    const isCrew = department === "CREW";
    const isCast = department === "CAST";

    return (
        <header className="space-y-2">
            <MoviePersonListBreadcrumb movie={movie} department={department}/>

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
                    <LoggedLink to={`/admin/movies/get/${slug}/people/crew`} className={cn(
                        "text-primary",
                        buttonVariants({variant: isCrew ? "outline" : "link"}),
                        !isCrew && "text-neutral-400"
                    )}>
                        Crew
                    </LoggedLink>

                    <LoggedLink to={`/admin/movies/get/${slug}/people/cast`} className={cn(
                        "text-primary",
                        buttonVariants({variant: isCast ? "outline" : "link"}),
                        !isCast && "text-neutral-400"
                    )}>
                        Cast
                    </LoggedLink>
                </nav>
            </div>
        </header>
    );
}