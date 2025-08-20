import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {format} from "date-fns";
import CloudinaryAvatarImage from "@/common/components/images/CloudinaryAvatarImage.tsx";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {Search} from "lucide-react";

/**
 * Props for the `PersonIndexCard` component.
 */
type IndexProps = {
    /** The person object to display */
    person: Person;
};

/**
 * A card component that displays a person's basic information:
 * - Name
 * - Date of birth
 * - Nationality
 * - Profile image
 *
 * It also provides a button to open the person's detail page in a new tab.
 *
 * @param {IndexProps} props - Component props
 * @returns {JSX.Element} The rendered person card
 */
const PersonIndexCard: FC<IndexProps> = ({person}) => {
    const {_id, name, dob, nationality, profileImage} = person;

    const formattedDOB = format(dob, "dd MMM, yyyy");
    const formattedNationality = ISO3166Alpha2CountryConstant[nationality];

    const navigateToDetails = () => window.open(`/admin/persons/get/${_id}`, 'blank')

    return (
        <Card>
            <CardContent className="p-4 h-full flex items-center space-x-2">
                <CloudinaryAvatarImage personName={name} image={profileImage} className="h-16 w-16"/>

                <div className="flex-grow flex flex-col">
                    <h1 className="font-bold text-lg">{name}</h1>
                    <span className="text-sm text-neutral-500">{formattedDOB} | {formattedNationality}</span>
                </div>

                <Button variant="outline" onClick={navigateToDetails}>
                    <Search/>
                </Button>
            </CardContent>
        </Card>
    );
};

export default PersonIndexCard;
