import {FC} from 'react';
import {Seat} from "@/pages/seats/schema/SeatSchema.ts";
import {useNavigate} from "react-router-dom";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import {Pencil, TableOfContents, Trash} from "lucide-react";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import useSeatDeleteMutation from "@/pages/seats/hooks/useSeatDeleteMutation.ts";
import HeaderButton from "@/common/components/page/headers/HeaderButton.tsx";

interface Props {
    seat: Seat;
}

const SeatDetailsHeader: FC<Props> = ({seat}) => {
    const navigate = useNavigate();
    const {_id, row, seatNumber, theatre} = seat;

    const theatreName = (theatre as Theatre).name;

    const {mutate, isPending, isSuccess} = useSeatDeleteMutation({onDelete: () => navigate("/admin/seats")});

    const isDisabled = isPending || isSuccess;
    const deleteSeat = () => mutate({_id});

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>{row} | {seatNumber}</HeaderTitle>
                <HeaderDescription>Seat At {theatreName}</HeaderDescription>
            </div>

            <section className="space-x-2 flex justify-end items-center">
                <HeaderLink variant="link" to="/admin/seats">
                    <TableOfContents/> Index
                </HeaderLink>

                <HeaderLink variant="link" to={`/admin/seats/edit/${_id}`}>
                    <Pencil /> Edit
                </HeaderLink>

                <HeaderButton variant="link" onClick={deleteSeat} disabled={isDisabled}>
                    <Trash /> Delete
                </HeaderButton>
            </section>
        </header>
    );
};

export default SeatDetailsHeader;
