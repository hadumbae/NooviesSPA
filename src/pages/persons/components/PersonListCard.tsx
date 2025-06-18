import {FC} from 'react';
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {format} from "date-fns";
import PersonOptions from "@/pages/persons/components/PersonOptions.tsx";
import {Link} from "react-router-dom";
import CloudinaryAvatarImage from "@/common/components/images/CloudinaryAvatarImage.tsx";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";

interface Props {
    person: Person;
    onDelete?: () => void;
}

const PersonListCard: FC<Props> = ({person, onDelete}) => {
    const {_id, name, dob, nationality, profileImage} = person;

    const formattedDOB = format(dob, "dd MMM, yyyy");
    const formattedNationality = ISO3166Alpha2CountryConstant[nationality];

    return (
        <Card>
            <CardContent className="p-4 h-full flex items-center space-x-2">
                <CloudinaryAvatarImage
                    personName={name}
                    image={profileImage}
                    className="h-16 w-16"
                />

                <div className="flex-grow flex flex-col">
                    <Link
                        className="font-bold text-lg hover:underline"
                        to={`/admin/persons/get/${_id}`}
                    >
                        {name}
                    </Link>

                    <span className="text-sm text-neutral-500">{formattedDOB} | {formattedNationality}</span>
                </div>

                <PersonOptions
                    variant="link"
                    person={person}
                    onDelete={onDelete}
                />
            </CardContent>
        </Card>
    );
};

export default PersonListCard;
