/**
 * @fileoverview Header component for the Person Details page.
 */

import {ReactElement} from 'react';
import {EllipsisIcon} from "lucide-react";
import CloudinaryAvatarImage from "@/common/components/images/CloudinaryAvatarImage.tsx";
import {IconButton} from "@/views/common/_comp";
import {HeaderDescription, HeaderTitle} from "@/views/common/_comp/page-headers";

import {Person} from "@/domains/persons";
import {PersonDetailsActionToggles} from "@/views/admin/persons/_feat/person-details-actions";
import {PersonDetailsPageBreadcrumbs} from "@/views/admin/persons/_pages/details-page/sections/breadcrumbs.tsx";

/** Props for the PersonDetailsPageHeader component. */
type HeaderProps = {
    person: Person;
};

/**
 * Renders the identity header and administrative actions for a Person profile.
 */
export function PersonDetailsPageHeader(
    {person}: HeaderProps
): ReactElement {
    const {name, dob, profileImage} = person;
    const formattedDOB = dob.toFormat("dd MMM, yyyy");

    return (
        <header className="space-y-4">
            <PersonDetailsPageBreadcrumbs name={name}/>

            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <CloudinaryAvatarImage
                        personName={name}
                        image={profileImage}
                        className="h-16 w-16"
                    />

                    <div>
                        <HeaderTitle className="leading-tight">{name}</HeaderTitle>
                        <HeaderDescription>{formattedDOB}</HeaderDescription>
                    </div>
                </div>

                <PersonDetailsActionToggles>
                    <IconButton variant="outline" size="icon" icon={EllipsisIcon}/>
                </PersonDetailsActionToggles>
            </div>
        </header>
    );
}