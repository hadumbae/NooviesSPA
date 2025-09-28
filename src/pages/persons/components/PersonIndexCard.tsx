import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {format} from "date-fns";
import CloudinaryAvatarImage from "@/common/components/images/CloudinaryAvatarImage.tsx";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {Search} from "lucide-react";
import LoggedLink from "@/common/components/navigation/LoggedLink.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for {@link PersonIndexCard}.
 */
type IndexProps = {
    /** The person data to display in the card. */
    person: Person;
};

/**
 * Card component for displaying a summary of a person in the index page.
 *
 * @remarks
 * - Shows the person's avatar, name, date of birth, and nationality.
 * - Includes a link to navigate to the full person details page.
 * - Uses responsive and flexible layout inside a `Card`.
 *
 * @example
 * ```tsx
 * <PersonIndexCard person={person} />
 * ```
 */
const PersonIndexCard: FC<IndexProps> = ({person}) => {
    const {_id, name, dob, nationality, profileImage} = person;

    const formattedDOB = format(dob, "dd MMM, yyyy");
    const formattedNationality = ISO3166Alpha2CountryConstant[nationality];

    return (
        <Card>
            <CardContent className="p-4 h-full flex items-center space-x-2">
                {/* Person avatar */}
                <CloudinaryAvatarImage
                    personName={name}
                    image={profileImage}
                    className="h-16 w-16"
                />

                {/* Name and details */}
                <div className="flex-grow flex flex-col">
                    <h1 className="font-bold text-lg">{name}</h1>
                    <span className="text-sm text-neutral-500">
                        {formattedDOB} | {formattedNationality}
                    </span>
                </div>

                {/* Link to person details */}
                <LoggedLink
                    to={`/admin/persons/get/${_id}`}
                    component={PersonIndexCard.name}
                    message="Navigate to person details page."
                    className={cn(buttonVariants({variant: "outline"}))}
                >
                    <Search/>
                </LoggedLink>
            </CardContent>
        </Card>
    );
};

export default PersonIndexCard;
