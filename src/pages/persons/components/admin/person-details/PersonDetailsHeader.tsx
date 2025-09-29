import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {EllipsisIcon} from "lucide-react";
import {format} from "date-fns";
import {cn} from "@/common/lib/utils.ts";
import HeaderButton from "@/common/components/page/headers/HeaderButton.tsx";
import CloudinaryAvatarImage from "@/common/components/images/CloudinaryAvatarImage.tsx";
import {Person, PersonDetails} from "@/pages/persons/schema/person/Person.types.ts";
import PersonDetailsOptions
    from "@/pages/persons/components/admin/person-details/PersonDetailsOptions.tsx";

type HeaderProps = {
    /** The person whose details are displayed in this header. */
    person: Person | PersonDetails;
};

/**
 * Header component for the Person Details page.
 *
 * @remarks
 * Displays the person's avatar, name, and date of birth, along with
 * a dropdown menu for actions like editing, uploading an avatar,
 * or deleting the person.
 *
 * - Uses `CloudinaryAvatarImage` to show the person's profile image.
 * - Uses `HeaderTitle` and `HeaderDescription` for name and formatted DOB.
 * - Includes `PersonDetailsOptions` to trigger context-based UI actions.
 *
 * @example
 * ```tsx
 * <PersonDetailsHeader person={person} />
 * ```
 */
const PersonDetailsHeader: FC<HeaderProps> = ({person}) => {
    const {name, dob, profileImage} = person;
    const formattedDOB = format(dob, "dd MMM, yyyy");

    return (
        <header className={cn("flex justify-between items-center")}>
            <section className="flex space-x-3">
                <CloudinaryAvatarImage personName={name} image={profileImage} />
                <div className="flex flex-col justify-center">
                    <HeaderTitle>{name}</HeaderTitle>
                    <HeaderDescription>{formattedDOB}</HeaderDescription>
                </div>
            </section>

            <section className="flex justify-end items-center space-x-2">
                <PersonDetailsOptions>
                    <HeaderButton variant="outline">
                        <EllipsisIcon />
                    </HeaderButton>
                </PersonDetailsOptions>
            </section>
        </header>
    );
};

export default PersonDetailsHeader;
