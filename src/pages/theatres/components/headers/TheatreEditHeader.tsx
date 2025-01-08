import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Search, TableOfContents} from "lucide-react";

interface Props {
    theatre: Theatre;
}

const TheatreEditHeader: FC<Props> = ({theatre}) => {
    const {_id, name} = theatre

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>Edit the theatre ({name}) here.</HeaderDescription>
            </div>

            <div className="space-x-2">
                <HeaderLink to="/admin/theatres">
                    <TableOfContents/>
                </HeaderLink>
                <HeaderLink to={`/admin/theatres/get/${_id}`}>
                    <Search/>
                </HeaderLink>
            </div>
        </header>
    );
};

export default TheatreEditHeader;
