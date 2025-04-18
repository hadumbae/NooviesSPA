import {FC} from 'react';
import {Showing} from "@/pages/showings/schema/base/ShowingSchema.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import {format} from "date-fns";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Link} from "lucide-react";
import HoverLink from "@/common/components/navigation/HoverLink.tsx";
import {SeatMap} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import useValidateShowingAndSeatMap from "@/pages/seatmap/hooks/validation/useValidateShowingAndSeatMap.ts";

interface Props {
    seatMap: SeatMap;
    showing: Showing;
}

const ShowingSeatMapEditHeader: FC<Props> = ({showing, seatMap}) => {
    // Seating Subtitle

    const {showing: populatedShowing, seatMap: populatedSeatMap} = useValidateShowingAndSeatMap({showing, seatMap});

    const {seat: {seatNumber, row}} = populatedSeatMap;
    const {_id, movie: {title, releaseDate}} = populatedShowing;
    const formattedReleaseDate = format(releaseDate, "yyyy");

    return (
        <header className="flex flex-col justify-between space-y-2">
            <section>
                <HeaderTitle>Edit Seating | {seatNumber} ({row}) </HeaderTitle>
                <HeaderDescription>{title} ({formattedReleaseDate})</HeaderDescription>
            </section>

            <nav className="flex justify-between items-center">
                <HoverLink
                    to={`/admin/showings`}
                    className="text-[12px] text-neutral-400 hover:text-black"
                >
                    <Link className="inline" size={12} /> Index
                </HoverLink>

                <div>
                    <HoverLink
                        to={`/admin/showings/get/${_id}`}
                        className="text-[12px] text-neutral-400 hover:text-black"
                    >
                        <Link className="inline" size={12} /> Showing
                    </HoverLink>

                    <HoverLink
                        to={`/admin/showings/get/${_id}/seating`}
                        className="text-[12px] text-neutral-400 hover:text-black"
                    >
                        <Link className="inline" size={12} /> Seating
                    </HoverLink>
                </div>
            </nav>
        </header>
    );
};
export default ShowingSeatMapEditHeader;
