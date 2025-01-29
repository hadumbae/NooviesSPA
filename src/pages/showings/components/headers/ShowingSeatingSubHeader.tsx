import {FC} from 'react';
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {ChevronLeft, Plus} from "lucide-react";
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";

interface Props {
    showing: Showing;
}

const ShowingSeatingSubHeader: FC<Props> = ({showing}) => {
    const {_id} = showing;

    return (
        <header className="flex justify-between items-center">
            <HeaderLink to={`/admin/showings/create/${_id}/seating`}>
                <Plus />
            </HeaderLink>

            <HeaderLink to={`/admin/showings/get/${_id}`}>
                 <ChevronLeft/> Showing
            </HeaderLink>
        </header>
    );
};

export default ShowingSeatingSubHeader;
