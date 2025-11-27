import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Link, TriangleAlert} from "lucide-react";
import HoverLink from "@/common/components/navigation/HoverLink.tsx";
import useValidateShowingAndSeatMap from "@/pages/seatmap/hooks/validation/useValidateShowingAndSeatMap.ts";
import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";
import {SeatMap} from "@/pages/seatmap/schema/model/SeatMap.types.ts";

interface Props {
    seatMap: SeatMap;
    showing: Showing;
}

const ShowingSeatMapEditHeader: FC<Props> = ({showing, seatMap}) => {
    // Seating Subtitle

    const {data, error, success} = useValidateShowingAndSeatMap({showing, seatMap});

    if (!success) {
        return <header className="flex space-x-5 items-center text-red-500">
            <TriangleAlert />
            <span>{error?.message || "Something went wrong! Please try again!"}</span>
        </header>
    }

    const {showing: parsedShowing, seatMap: parsedSeatMap} = data;

    const {seat: {seatNumber, row}} = parsedSeatMap!;
    const {_id, movie: {title, releaseDate}} = parsedShowing!;
    const formattedReleaseDate = releaseDate?.toFormat("yyyy") ?? "Unreleased";

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
