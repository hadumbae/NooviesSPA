import {FC} from 'react';
import {ChevronLeft} from "lucide-react";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";

import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";

interface Props {
    showing: Showing;
}

const ShowingSeatMapCreateNavigation: FC<Props> = ({showing}) => {
    const {_id} = showing;

    return (
        <div className="flex justify-between">
            <HeaderLink variant="link" to={`/admin/showings/get/${_id}/seating`}>
                <ChevronLeft /> Seating
            </HeaderLink>

            <HeaderLink variant="link" to={`/admin/showings/get/${_id}/seating`}>
                <ChevronLeft /> Seating
            </HeaderLink>
        </div>
    );
};

export default ShowingSeatMapCreateNavigation;
