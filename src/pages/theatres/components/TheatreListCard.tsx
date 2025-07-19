import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {Search} from "lucide-react";
import getAddressString from "@/common/utility/location/getAddressString.ts";

interface Props {
    theatre: TheatreDetails;
}

const TheatreListCard: FC<Props> = ({theatre}) => {
    const {_id, name, location} = theatre;
    const addressString = getAddressString(location);


    return (
        <Card>
            <CardContent className="grid grid-cols-3 p-4">
                <section className="col-span-2 space-y-1">
                        <h1 className="text-xl font-extrabold">{name}</h1>
                        <h2 className="text-neutral-400 text-sm">{addressString}</h2>
                </section>

                <section className="flex justify-end items-center">
                    <ButtonLink
                        to={`/admin/theatres/get/${_id}`}
                        variant="outline"
                    >
                        <Search />
                    </ButtonLink>
                </section>

            </CardContent>
        </Card>
    );
};

export default TheatreListCard;
