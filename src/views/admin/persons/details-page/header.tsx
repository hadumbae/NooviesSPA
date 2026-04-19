/**
 * @fileoverview Header component for the Person Details page.
 * Displays primary identity metadata and provides a dropdown for administrative actions.
 */

import {ReactElement} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {EllipsisIcon} from "lucide-react";
import CloudinaryAvatarImage from "@/common/components/images/CloudinaryAvatarImage.tsx";
import {Person} from "@/domains/persons/schema/person/Person.types.ts";
import PersonDetailsOptions from "@/views/admin/persons/_feat/person-details-actions/PersonDetailsOptions.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {PersonDetailsPageBreadcrumbs} from '@/views/admin/persons/details-page/breadcrumbs.tsx';

/**
 * Props for the {@link PersonDetailsPageHeader} component.
 */
type HeaderProps = {
    /** The person entity containing identity and portrait data. */
    person: Person;
};

/**
 * Renders the top-level identity section for a Person profile.
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
                    <div className="flex flex-col">
                        <HeaderTitle className="leading-tight">{name}</HeaderTitle>
                        <HeaderDescription>{formattedDOB}</HeaderDescription>
                    </div>
                </div>

                <PersonDetailsOptions>
                    <IconButton variant="outline" size="icon" icon={EllipsisIcon}/>
                </PersonDetailsOptions>
            </div>
        </header>
    );
}