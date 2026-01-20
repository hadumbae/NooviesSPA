import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import CloudinaryAvatarImage from "@/common/components/images/CloudinaryAvatarImage.tsx";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

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
    const {name, dob, nationality, profileImage, slug} = person;

    const formattedDOB = dob.toFormat("dd MMM, yyyy");
    const formattedNationality = ISO3166Alpha2CountryConstant[nationality];

    return (
        <LoggedLink to={`/admin/persons/get/${slug}`}>
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
                        <h2 className="font-bold text-lg">{name}</h2>

                        <span className="text-sm text-neutral-500">
                            {formattedDOB} | {formattedNationality}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </LoggedLink>
    );
};

export default PersonIndexCard;
