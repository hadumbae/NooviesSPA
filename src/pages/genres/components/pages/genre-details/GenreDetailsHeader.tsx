import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import {Pencil, Trash} from "lucide-react";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";
import HeaderButton from "@/common/components/page/headers/HeaderButton.tsx";
import GenreDeleteWarningDialog from "@/pages/genres/components/dialog/GenreDeleteWarningDialog.tsx";
import GenreSubmitFormPanel from "@/pages/genres/components/form/GenreSubmitFormPanel.tsx";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";

interface Props {
    genre: Genre;
}

const GenreDetailsHeader: FC<Props> = ({genre}) => {
    const navigate = useLoggedNavigate();
    const {_id, name} = genre;

    const onDelete = () => {
        navigate({
            to: "/admin/genres",
            component: GenreDetailsHeader.name,
            message: "Navigate on genre deletion."
        })
    }

    const editDialog = (
        <GenreSubmitFormPanel isEditing={true} genre={genre}>
            <HeaderButton variant="link">
                <Pencil /> Edit
            </HeaderButton>
        </GenreSubmitFormPanel>
    );

    const deleteDialog = (
        <GenreDeleteWarningDialog genreID={_id} onSubmitSuccess={onDelete}>
            <HeaderButton variant="link">
                <Trash/> Delete
            </HeaderButton>
        </GenreDeleteWarningDialog>
    );

    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center"
        )}>
            <section>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>Genre</HeaderDescription>
            </section>

            <section className="space-x-2 flex justify-end items-center">
                {editDialog}
                {deleteDialog}
            </section>
        </header>
    );
};

export default GenreDetailsHeader;
