import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Plus} from "lucide-react";

const SeatListHeader: FC = () => {
    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>Seats</HeaderTitle>
                <HeaderDescription>The seats where the movies will be shown.</HeaderDescription>
            </div>

            <HeaderLink to="/admin/seats/create">
                <Plus/>
            </HeaderLink>
        </header>
    );
};

export default SeatListHeader;
