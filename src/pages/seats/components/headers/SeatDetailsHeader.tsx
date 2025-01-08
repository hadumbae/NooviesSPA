import {FC} from 'react';
import {Seat} from "@/pages/seats/schema/SeatSchema.ts";
import SeatOptions from "@/pages/seats/components/SeatOptions.tsx";
import {useNavigate} from "react-router-dom";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import {TableOfContents} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";

interface Props {
    seat: Seat;
}

const SeatDetailsHeader: FC<Props> = ({seat}) => {
    const navigate = useNavigate();
    const {row, seatNumber, theatre} = seat;

    const theatreName = (theatre as Theatre).name;

    const navigateToIndex = () => {
        navigate("/admin/seats");
    }

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>{row} | {seatNumber}</HeaderTitle>
                <HeaderDescription>Seat At {theatreName}</HeaderDescription>
            </div>

            <div className="space-x-2">
                <Button
                    className="p-2"
                    variant="outline"
                    onClick={navigateToIndex}
                >
                    <TableOfContents/>
                </Button>

                <SeatOptions
                    seat={seat}
                    onDelete={navigateToIndex}
                    className="p-2"
                    variant="outline"
                />
            </div>
        </header>
    );
};

export default SeatDetailsHeader;
