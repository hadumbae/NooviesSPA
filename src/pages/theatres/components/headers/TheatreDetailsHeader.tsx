import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import {Pencil, TableOfContents, Trash} from "lucide-react";
import {useNavigate} from "react-router-dom";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {cn} from "@/common/lib/utils.ts";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import useTheatreDeleteMutation from "@/pages/theatres/hooks/mutations/useTheatreDeleteMutation.ts";
import HeaderButton from "@/common/components/page/headers/HeaderButton.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

interface Props {
    theatre: TheatreDetails;
}

const TheatreDetailsHeader: FC<Props> = ({theatre}) => {
    const navigate = useNavigate();
    const {_id, name} = theatre;

    const {mutate, isPending, isSuccess} = useTheatreDeleteMutation({onDelete: () => navigate("/admin/theatres")});
    const isDisabled = isPending || isSuccess;

    const deleteTheatre = () => {
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
                <HeaderDescription>Theatre</HeaderDescription>
            </section>

            <section className="space-x-2 flex justify-end items-center ">
                <HeaderLink variant="link" to="/admin/theatres">
                    <TableOfContents /> Index
                </HeaderLink>

                <HeaderLink variant="link" to={`/admin/theatres/edit/${_id}`}>
                    <Pencil /> Edit
                </HeaderLink>

                <HeaderButton variant="link" onClick={deleteTheatre} disabled={isDisabled}>
                    <Trash /> Delete
                </HeaderButton>
            </section>
        </header>
    );
};

export default TheatreDetailsHeader;
