import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {TableOfContents} from "lucide-react";
import LoggedLink from "@/common/components/navigation/LoggedLink.tsx";

const ShowingCreateHeader: FC = () => {
    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>Create Showings</HeaderTitle>
                <HeaderDescription>Enter details and press on `Submit` to create showings.</HeaderDescription>
            </div>

            <LoggedLink to="/admin/showings">
                <TableOfContents />
            </LoggedLink>
        </header>
    );
};

export default ShowingCreateHeader;
