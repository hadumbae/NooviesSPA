import {FC} from 'react';
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import useValidatePopulatedShowing from "@/pages/showings/hooks/validation/useValidatePopulatedShowing.ts";
import {format} from "date-fns";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Link} from "lucide-react";
import HoverLink from "@/common/components/navigation/HoverLink.tsx";

interface Props {
    showing: Showing;
}

const ShowingSeatMapCreateHeader: FC<Props> = ({showing}) => {
    const populatedSchema = useValidatePopulatedShowing(showing);
    const {_id, movie: {title, releaseDate}} = populatedSchema;

    const formattedReleaseDate = format(releaseDate, "yyyy");

    return (
        <header className="flex flex-col justify-between space-y-2">
            <section>
                <HeaderTitle>{title} ({formattedReleaseDate})</HeaderTitle>
                <HeaderDescription>Create Seating For Showing</HeaderDescription>
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
export default ShowingSeatMapCreateHeader;
