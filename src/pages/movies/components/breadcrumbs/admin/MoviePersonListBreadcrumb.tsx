import {FC} from 'react';
import {RoleType} from "@/pages/moviecredit/schemas/enums/RoleTypeEnumSchema.ts";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import convertToTitleCase from "@/common/utility/convertToTitleCase.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";

interface PersonListBreadcrumbProps {
    movie: Movie;
    roleType: RoleType;
}

const MoviePersonListBreadcrumb: FC<PersonListBreadcrumbProps> = ({movie, roleType}) => {
    const {_id} = movie;
    const parsedRoleType = convertToTitleCase(roleType);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href={"/admin/movies"}>Index</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbLink href={`/admin/movies/get/${_id}`}>Movie Details</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>{parsedRoleType}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default MoviePersonListBreadcrumb;
