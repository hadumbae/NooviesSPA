import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {Link} from "react-router-dom";
import {Armchair} from "lucide-react";

interface Props {
    screen: ScreenDetails;
}

const TheatreScreenPreviewCard: FC<Props> = ({screen}) => {
    const {_id, name, screenType, seatCount} = screen;

    return (
        <Card>
            <Link to={`/admin/screens/get/${_id}`} target="_blank">
                <CardContent className="p-4 flex justify-between items-center hover:shadow-md">
                    <span className="underline underline-offset-4">{name}</span>

                    <span className="italic text-neutral-400">{screenType}</span>

                    <div className="flex items-center space-x-2">
                        <span>{seatCount}</span>
                        <Armchair size="20" />
                    </div>
                </CardContent>
            </Link>

        </Card>
    );
};

export default TheatreScreenPreviewCard;
