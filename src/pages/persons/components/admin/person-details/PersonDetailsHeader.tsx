import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {EllipsisIcon} from "lucide-react";
import {format} from "date-fns";
import {cn} from "@/common/lib/utils.ts";
import HeaderButton from "@/common/components/page/headers/HeaderButton.tsx";
import CloudinaryAvatarImage from "@/common/components/images/CloudinaryAvatarImage.tsx";
import {Person, PersonDetails} from "@/pages/persons/schema/person/Person.types.ts";
import PersonDetailsOptionDropdown
    from "@/pages/persons/components/admin/person-details/PersonDetailsOptionDropdown.tsx";

interface Props {
    person: Person | PersonDetails;
}

const PersonDetailsHeader: FC<Props> = ({person}) => {
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
                <PersonDetailsOptionDropdown person={person}>
                    <HeaderButton variant="outline">
                        <EllipsisIcon />
                    </HeaderButton>
                </PersonDetailsOptionDropdown>
            </section>
        </header>
    );
};

export default PersonDetailsHeader;
