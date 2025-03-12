import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {useNavigate} from "react-router-dom";
import {Loader, Pencil, TableOfContents, Trash} from "lucide-react";
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import {format} from "date-fns";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {cn} from "@/common/lib/utils.ts";
import usePersonDeleteMutation from "@/pages/persons/hooks/usePersonDeleteMutation.ts";
import HeaderButton from "@/common/components/page/headers/HeaderButton.tsx";

interface Props {
    person: Person;
}

const PersonDetailsHeader: FC<Props> = ({person}) => {
    const navigate = useNavigate();

    const {_id, name, dob, nationality} = person;
    const formattedDOB = format(dob, "dd MMM, yyyy");

    const onDelete = () => {
        navigate("/admin/persons");
    }

    const {mutate, isPending, isSuccess} = usePersonDeleteMutation({onDelete});
    const isDisabled = isPending || isSuccess;

    const deletePerson = () => {
        mutate({_id});
    }

    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center",
        )}>
            <section>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>{formattedDOB} | {nationality}</HeaderDescription>
            </section>

            <section className="flex justify-end items-center space-x-2">
                <HeaderLink variant="link" to="/admin/persons">
                    <TableOfContents/> Index
                </HeaderLink>

                <HeaderLink variant="link" to={`/admin/persons/edit/${_id}`}>
                    <Pencil /> Edit
                </HeaderLink>

                <HeaderButton variant="link" onClick={deletePerson}>
                    {
                        isDisabled
                        ? <Loader className="animate-spin" />
                        : <>
                            <Trash /> Delete
                        </>
                    }
                </HeaderButton>
            </section>
        </header>
    );
};

export default PersonDetailsHeader;
