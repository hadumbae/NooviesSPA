import {FC} from 'react';
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {format} from "date-fns";
import PersonOptions from "@/pages/persons/components/PersonOptions.tsx";
import {Link} from "react-router-dom";

interface Props {
    person: Person;
    onDelete?: () => void;
}

const PersonListCard: FC<Props> = ({person, onDelete}) => {
    const {_id, name, dob, nationality} = person;
    const formattedDOB = format(dob, "dd MMM, yyyy");

    return (
        <Card>
            <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <Link
                            className="font-bold text-lg hover:underline"
                            to={`/admin/persons/get/${_id}`}
                        >
                            {name}
                        </Link>

                        <span className="text-sm text-neutral-500">{formattedDOB} | {nationality}</span>
                    </div>

                    <PersonOptions
                        variant="link"
                        person={person}
                        onDelete={onDelete}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default PersonListCard;
