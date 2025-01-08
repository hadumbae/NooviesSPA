import {FC} from 'react';
import {Seat} from "@/pages/seats/schema/SeatSchema.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Search, TableOfContents} from "lucide-react";

interface Props {
    seat: Seat;
}

const SeatEditHeader: FC<Props> = ({seat}) => {
    const {_id, seatNumber, row} = seat;

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>{seatNumber} ({row})</HeaderTitle>
                <HeaderDescription>Edit the seat ({seatNumber}) here.</HeaderDescription>
            </div>

            <div className="space-x-2">
                <HeaderLink to="/admin/seats">
                    <TableOfContents />
                </HeaderLink>

                <HeaderLink to={`/admin/seats/get/${_id}`}>
                    <Search />
                </HeaderLink>
            </div>
        </header>
    );
};

export default SeatEditHeader;
