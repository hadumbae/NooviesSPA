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
import {useNavigate} from "react-router-dom";

type HeaderProps = {
    person: Person | PersonDetails;
}

const PersonDetailsHeader: FC<HeaderProps> = ({person}) => {
    const navigate = useNavigate();

    const {name, dob, profileImage} = person;
    const formattedDOB = format(dob, "dd MMM, yyyy");

    const onDelete = () => {
        navigate("/admin/persons");
    }

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
                <PersonDetailsOptions person={person} onDeleteProps={{onSubmitSuccess: onDelete}}>
                    <HeaderButton variant="outline">
                        <EllipsisIcon />
                    </HeaderButton>
                </PersonDetailsOptions>
            </section>
        </header>
    );
};

export default PersonDetailsHeader;
