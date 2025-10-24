import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/common/components/ui/avatar.tsx";
import getInitials from "@/common/utility/formatters/getInitials.ts";
import {Link} from "react-router-dom";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";

interface Props {
    person: Person,
    role: "Director" | "Cast",
}

const MoviePersonAvatarCard: FC<Props> = ({person, role = "Cast"}) => {
    const {_id, name, profileImage} = person
    const {secure_url} = profileImage || {};

    return (
        <Card key={_id} className="w-full">
            {/*<CardContent className="p-6 flex flex-col items-center space-y-7">*/}
            <CardContent className="p-6 flex justify-center items-center space-x-5">
                <Avatar>
                    <AvatarImage src={secure_url} />
                    <AvatarFallback>{getInitials(name)}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col items-center">
                    <Link className="font-bold hover:underline hover:underline-offset-4"
                          to={`/admin/persons/get/${_id}`}
                    >
                        {name}
                    </Link>

                    <span className="text-sm text-neutral-500">
                        {role}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default MoviePersonAvatarCard;
