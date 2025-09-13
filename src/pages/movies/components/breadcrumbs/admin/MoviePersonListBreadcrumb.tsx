import {FC} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import convertToTitleCase from "@/common/utility/convertToTitleCase.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {format} from "date-fns";

interface PersonListBreadcrumbProps {
    movie: Movie;
    department: RoleTypeDepartment;
}

const MoviePersonListBreadcrumb: FC<PersonListBreadcrumbProps> = ({movie, department}) => {
    const {_id, title, releaseDate} = movie;

    const parsedDepartment = convertToTitleCase(department);
    const parsedReleaseDate = releaseDate ? `(${format(releaseDate, "yyyy")})` : "";

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href={"/admin/movies"}>Index</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbLink href={`/admin/movies/get/${_id}`}>{`${title} ${parsedReleaseDate}`}</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>{parsedDepartment}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default MoviePersonListBreadcrumb;
