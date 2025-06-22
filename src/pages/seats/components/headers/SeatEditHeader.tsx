import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Search, TableOfContents} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";

interface Props {
    seat: Seat;
}

const SeatEditHeader: FC<Props> = ({seat}) => {
    const {_id, seatNumber, row} = seat;

    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center",
        )}>
            <section>
                <HeaderTitle>{seatNumber} ({row})</HeaderTitle>
                <HeaderDescription>Edit the seat ({seatNumber}) here.</HeaderDescription>
            </section>

            <section className="space-x-2 flex justify-end items-center">
                <HeaderLink variant="link" to="/admin/seats">
                    <TableOfContents /> Index
                </HeaderLink>

                <HeaderLink variant="link" to={`/admin/seats/get/${_id}`}>
                    <Search /> Details
                </HeaderLink>
            </section>
        </header>
    );
};

export default SeatEditHeader;
