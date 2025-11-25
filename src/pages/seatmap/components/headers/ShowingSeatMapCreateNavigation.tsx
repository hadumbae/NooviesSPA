import {FC} from 'react';
import {ChevronLeft} from "lucide-react";

import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";

interface Props {
    showing: Showing;
}

const ShowingSeatMapCreateNavigation: FC<Props> = ({showing}) => {
    const {_id} = showing;

    return (
        <div className="flex justify-between">
            <LoggedHoverLink to={`/admin/showings/get/${_id}/seating`}>
                <ChevronLeft /> Seating
            </LoggedHoverLink>

            <LoggedHoverLink to={`/admin/showings/get/${_id}/seating`}>
                <ChevronLeft /> Seating
            </LoggedHoverLink>
        </div>
    );
};

export default ShowingSeatMapCreateNavigation;
