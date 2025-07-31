import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Loader, Pencil, TableOfContents, Trash} from "lucide-react";
import {useNavigate} from "react-router-dom";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import useGenreDeleteMutation from "@/pages/genres/hooks/useGenreDeleteMutation.ts";
import HeaderButton from "@/common/components/page/headers/HeaderButton.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";

interface Props {
    genre: Genre;
}

const GenreDetailsHeader: FC<Props> = ({genre}) => {
    const navigate = useNavigate();
    const {name} = genre;

    const onDelete = () => {
        navigate("/admin/genres")
    }

    const {_id} = genre;
    const {mutate, isPending, isSuccess} = useGenreDeleteMutation({onDelete});

    const isDisabled = isPending || isSuccess;

    const deleteGenre = () => {
        mutate({_id});
    }

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
                <HeaderLink variant="link" to="/admin/genres">
                    <TableOfContents /> Index
                </HeaderLink>

                <HeaderLink variant="link" to={`/admin/genres/edit/${_id}`}>
                    <Pencil /> Edit
                </HeaderLink>

                <HeaderButton variant="link" disabled={isDisabled} onClick={deleteGenre}>
                    {
                        (isDisabled)
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

export default GenreDetailsHeader;
