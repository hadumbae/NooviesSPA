import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Plus} from "lucide-react";

const ScreenIndexHeader: FC = () => {
    return (
        <header className="flex justify-between items-center">
            <section>
                <HeaderTitle>Screens</HeaderTitle>
                <HeaderDescription>The screens where the movies will be shown.</HeaderDescription>
            </section>

            <HeaderLink variant="link" to="/admin/screens/create">
                <Plus/> Create
            </HeaderLink>
        </header>
    );
};

export default ScreenIndexHeader;
