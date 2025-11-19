import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Link} from "react-router-dom";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

interface HeaderProps {
    movie: Movie;
    roleType: RoleTypeDepartment;
}

const MoviePeopleHeader: FC<HeaderProps> = ({movie, roleType}) => {
    const {_id, title} = movie;
    const parsedType = convertToTitleCase(roleType);

    const isCrew = roleType === "CREW";
    const isCast = roleType === "CAST";

    return (
        <header className={cn(
            "flex ",
            "max-md:flex-col max-md:space-y-5",
            "md:justify-between md:items-center"
        )}>
            <section>
                <HeaderTitle>{title}</HeaderTitle>
                <HeaderDescription>{parsedType}</HeaderDescription>
            </section>

            <section className={cn(
                "flex space-x-2 items-center",
                "max-md:justify-center",
                "md:justify-end",
            )}>
                <Link
                    to={`/admin/movies/get/${_id}/people/crew`}
                    className={cn(
                        buttonVariants({variant: isCrew ? "outline" : "link"}),
                        PrimaryTextBaseCSS,
                        !isCrew && "text-neutral-400",
                    )}
                >
                    Crew
                </Link>

                <Link
                    to={`/admin/movies/get/${_id}/people/cast`}
                    className={cn(
                        buttonVariants({variant: isCast ? "outline" : "link"}),
                        PrimaryTextBaseCSS,
                        !isCast && "text-neutral-400",
                    )}
                >
                    Cast
                </Link>
            </section>
        </header>
    );
};

export default MoviePeopleHeader;
