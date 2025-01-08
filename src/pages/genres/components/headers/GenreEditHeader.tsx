import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Link} from "react-router-dom";
import {cn} from "@/common/lib/utils.ts";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {Search, TableOfContents} from "lucide-react";
import {Genre} from "@/pages/genres/schema/GenreSchema.ts";

interface Props {
    genre: Genre;
}

const GenreEditHeader: FC<Props> = ({genre}) => {
    const {_id, name} = genre;

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>Edit | {name}</HeaderTitle>
                <HeaderDescription>
                    Edit the genre `{name}` here.
                </HeaderDescription>
            </div>

            <div className="flex items-center space-x-4">
                <Link to="/admin/genres"
                      className={cn(buttonVariants({variant: "outline"}), "p-4")}
                >
                    <TableOfContents/>
                </Link>
                <Link to={`/admin/genres/get/${_id}`}
                      className={cn(buttonVariants({variant: "outline"}), "p-4")}
                >
                    <Search/>
                </Link>
            </div>
        </header>
    );
};

export default GenreEditHeader;
