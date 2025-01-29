import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {TableOfContents} from "lucide-react";

const ShowingCreateHeader: FC = () => {
    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>Create Showings</HeaderTitle>
                <HeaderDescription>Enter details and press on `Submit` to create showings.</HeaderDescription>
            </div>

            <HeaderLink to="/admin/showings">
                <TableOfContents />
            </HeaderLink>
        </header>
    );
};

export default ShowingCreateHeader;
