import {FC} from 'react';
import {ChevronLeft} from "lucide-react";

import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";
import LoggedLink from "@/common/components/navigation/LoggedLink.tsx";

interface Props {
    showing: Showing;
}

const ShowingSeatMapCreateNavigation: FC<Props> = ({showing}) => {
    const {_id} = showing;

    return (
        <div className="flex justify-between">
            <LoggedLink to={`/admin/showings/get/${_id}/seating`}>
                <ChevronLeft /> Seating
            </LoggedLink>

            <LoggedLink to={`/admin/showings/get/${_id}/seating`}>
                <ChevronLeft /> Seating
            </LoggedLink>
        </div>
    );
};

export default ShowingSeatMapCreateNavigation;
