import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {useNavigate} from "react-router-dom";
import {Image, Loader, Pencil, Trash} from "lucide-react";
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import {format} from "date-fns";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {cn} from "@/common/lib/utils.ts";
import usePersonDeleteMutation from "@/pages/persons/hooks/mutations/admin/usePersonDeleteMutation.ts";
import HeaderButton from "@/common/components/page/headers/HeaderButton.tsx";
import CloudinaryAvatarImage from "@/common/components/images/CloudinaryAvatarImage.tsx";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";

interface Props {
    person: Person;
}

const PersonDetailsHeader: FC<Props> = ({person}) => {
    const navigate = useNavigate();

    const {_id, name, dob, nationality, profileImage} = person;

    const formattedDOB = format(dob, "dd MMM, yyyy");
    const formattedNationality = ISO3166Alpha2CountryConstant[nationality];

    const {mutate, isPending, isSuccess} = usePersonDeleteMutation({
        onDelete: () => navigate("/admin/persons")
    });

    const deletePerson = () => {
        mutate({_id});
    }

    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center",
        )}>
            <section className="flex space-x-3">
                <CloudinaryAvatarImage personName={name} image={profileImage} />
                <div className="flex flex-col justify-center">
                    <HeaderTitle>{name}</HeaderTitle>
                    <HeaderDescription>{formattedDOB} | {formattedNationality}</HeaderDescription>
                </div>
            </section>

            <section className="flex justify-end items-center space-x-2">
                <HeaderLink variant="link" to={`/admin/persons/get/${_id}/images/profile`}>
                    <Image/> Image
                </HeaderLink>

                <HeaderLink variant="link" to={`/admin/persons/edit/${_id}`}>
                    <Pencil/> Edit
                </HeaderLink>

                <HeaderButton variant="link" onClick={deletePerson}>
                    {
                        (isPending || isSuccess)
                            ? <Loader className="animate-spin"/>
                            : <>
                                <Trash/> Delete
                            </>
                    }
                </HeaderButton>
            </section>
        </header>
    );
};

export default PersonDetailsHeader;
