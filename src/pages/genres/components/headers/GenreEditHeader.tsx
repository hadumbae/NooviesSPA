import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Search, TableOfContents} from "lucide-react";
import {Genre} from "@/pages/genres/schema/GenreSchema.ts";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    genre: Genre;
}

const GenreEditHeader: FC<Props> = ({genre}) => {
    const {_id, name} = genre;

    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center",
        )}>
            <section>
                <HeaderTitle>Edit | {name}</HeaderTitle>
                <HeaderDescription>
                    Edit the genre `{name}` here.
                </HeaderDescription>
            </section>

            <section className="flex space-x-2 justify-end items-center">
                <HeaderLink variant="link" to="/admin/genres">
                    <TableOfContents /> Index
                </HeaderLink>

                <HeaderLink variant="link" to={`/admin/genres/get/${_id}`}>
                    <Search /> Genre
                </HeaderLink>
            </section>
        </header>
    );
};

export default GenreEditHeader;
