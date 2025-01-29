import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Plus} from "lucide-react";

const ShowingIndexHeader: FC = () => {
    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>Showings</HeaderTitle>
                <HeaderDescription>The showings of movies at theatres.</HeaderDescription>
            </div>

            <HeaderLink to="/admin/showings/create">
                <Plus />
            </HeaderLink>
        </header>
    );
};

export default ShowingIndexHeader;
