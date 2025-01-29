import {FC} from 'react';
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/common/components/ui/avatar.tsx";
import getInitials from "@/common/utility/getInitials.ts";

interface Props {
    person: Person,
    role: "Director" | "Cast",
}

const MoviePersonAvatarCard: FC<Props> = ({person, role = "Cast"}) => {
    const {_id, name, profileImage} = person
    const {secure_url} = profileImage || {};


    return (
        <Card key={_id} className="w-full">
            <CardContent className="p-6 flex flex-col items-center space-y-7">
                <Avatar>
                    <AvatarImage src={secure_url} />
                    <AvatarFallback>{getInitials(name)}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col items-center">
                    <span className="font-bold">{name}</span>
                    <span className="text-sm text-neutral-500">{role}</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default MoviePersonAvatarCard;
