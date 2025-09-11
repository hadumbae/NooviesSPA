import {FC} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import convertToTitleCase from "@/common/utility/convertToTitleCase.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";

interface PersonListBreadcrumbProps {
    movieTitle: string;
    movieID: ObjectId;
    roleType: RoleTypeDepartment;
}

const MoviePersonEditBreadcrumb: FC<PersonListBreadcrumbProps> = ({movieTitle, movieID, roleType}) => {
    const parsedRoleType = convertToTitleCase(roleType);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href={"/admin/movies"}>Index</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink href={`/admin/movies/get/${movieID}`}>{movieTitle}</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink href={`/admin/movies/get/${movieID}/people/${parsedRoleType}`}>
                        {parsedRoleType}
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>Edit</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default MoviePersonEditBreadcrumb;
