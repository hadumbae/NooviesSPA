import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Search, TableOfContents} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    theatre: Theatre;
}

const TheatreEditHeader: FC<Props> = ({theatre}) => {
    const {_id, name} = theatre

    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center"
        )}>
            <section>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>Edit the theatre ({name}) here.</HeaderDescription>
            </section>

            <section className="space-x-2 flex justify-end items-center">
                <HeaderLink variant="link" to="/admin/theatres">
                    <TableOfContents/> Index
                </HeaderLink>
                <HeaderLink variant="link" to={`/admin/theatres/get/${_id}`}>
                    <Search/> Details
                </HeaderLink>
            </section>
        </header>
    );
};

export default TheatreEditHeader;
