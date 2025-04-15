import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import {format} from "date-fns";
import useValidatePopulatedShowing from "@/pages/showings/hooks/validation/useValidatePopulatedShowing.ts";
import {cn} from "@/common/lib/utils.ts";
import {Plus, Search} from "lucide-react";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";

interface Props {
    showing: Showing;
}

const ShowingSeatingHeader: FC<Props> = ({showing}) => {
    const populatedShowing = useValidatePopulatedShowing(showing);
    const {movie, screen, theatre} = populatedShowing!;

    const {_id, title: movieTitle, releaseDate} = movie;
    const {name: screenName} = screen;
    const {name: theatreName} = theatre;

    const formattedDate = format(releaseDate, "yyyy");

    return (
        <header className={cn(
            "flex",
            "max-md:flex-col space-y-3",
            "md:justify-between md:items-center",
        )}>
            <section>
                <HeaderTitle>Seating For {movieTitle} ({formattedDate})</HeaderTitle>
                <HeaderDescription>{screenName} | {theatreName}</HeaderDescription>
            </section>

            <section className="flex justify-end items-center">
                <ButtonLink
                    size="sm" variant="link"
                    className="text-neutral-400 hover:text-black"
                    to={`/admin/showings/create/${_id}/seating`}>
                    <Plus /> Seating
                </ButtonLink>

                <ButtonLink
                    size="sm" variant="link"
                    className="text-neutral-400 hover:text-black"
                    to={`/admin/showings/get/${_id}`}>
                    <Search /> Showing
                </ButtonLink>
            </section>
        </header>
    );
};

export default ShowingSeatingHeader;
