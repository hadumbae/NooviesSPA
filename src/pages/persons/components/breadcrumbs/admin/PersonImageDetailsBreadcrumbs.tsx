import {FC} from 'react';
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/common/components/ui/breadcrumb.tsx";
import {Link} from "react-router-dom";

/**
 * Props for {@link PersonImageDetailsBreadcrumbs}.
 */
type CrumbProps = {
    /**
     * The ID of the person for constructing links.
     */
    personID: ObjectId;

    /**
     * The display name of the person.
     */
    name: string;
}

/**
 * Breadcrumb navigation component for the profile image page of a `Person`.
 *
 * Renders:
 * - A link to "All Persons"
 * - A link to the specific person's details page
 * - A current page indicator for "Profile Image"
 *
 * @param props - {@link CrumbProps}
 *
 * @example
 * ```tsx
 * <PersonImageDetailsBreadcrumbs personID={person._id} name={person.name} />
 * ```
 */
const PersonImageDetailsBreadcrumbs: FC<CrumbProps> = ({personID, name}) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/admin/persons">All Persons</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={`/admin/persons/get/${personID}`}>Person Details {name && ` | ${name}`}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>Profile Image</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default PersonImageDetailsBreadcrumbs;
