import {FC} from 'react';
import {Showing} from "@/pages/showings/schema/base/ShowingSchema.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import {format} from "date-fns";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Link} from "lucide-react";
import HoverLink from "@/common/components/navigation/HoverLink.tsx";
import useValidateData from "@/common/hooks/validation/useValidateData.ts";
import {PopulatedShowing, ShowingPopulatedSchema} from "@/pages/showings/schema/populated/ShowingPopulatedSchema.ts";

interface Props {
    showing: Showing;
}

const ShowingSeatMapCreateHeader: FC<Props> = ({showing}) => {
    const populatedShowing = useValidateData<typeof ShowingPopulatedSchema, PopulatedShowing>({
        data: showing,
        schema: ShowingPopulatedSchema,
        message: "[ShowingSeatMapCreateHeader] Invalid `Populated Showing`",
    });

    const {_id, movie: {title, releaseDate}} = populatedShowing!;

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
