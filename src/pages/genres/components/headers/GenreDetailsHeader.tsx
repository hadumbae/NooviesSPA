import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {TableOfContents} from "lucide-react";
import GenreOptions from "@/pages/genres/components/GenreOptions.tsx";
import {Genre} from "@/pages/genres/schema/GenreSchema.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    genre: Genre;
}

const GenreDetailsHeader: FC<Props> = ({genre}) => {
    const navigate = useNavigate();
    const {name} = genre;

    const onDelete = () => {
        navigate("/admin/genres")
    }

    return (
        <header className="flex justify-between items-center">
            <HeaderTitle>Genre | {name}</HeaderTitle>

            <div className="space-x-2 flex items-center">
                <HeaderLink to="/admin/genres">
                    <TableOfContents/>
                </HeaderLink>

                <GenreOptions
                    variant="outline" className="p-2"
                    genre={genre} onDelete={onDelete}
                />
            </div>
        </header>
    );
};

export default GenreDetailsHeader;
