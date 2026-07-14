/**
 * @fileoverview Card component for displaying a summary of a person in the admin index list.
 */

import {ReactElement} from 'react';
import {Card, CardContent} from "@/common/components/ui";
import {CloudinaryAvatarImage} from "@/views/common/_comp";
import {ISO3166Alpha2CountryConstant} from "@/common/_const";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {Person} from "@/domains/persons";

/** Props for the PersonIndexCard component. */
type IndexProps = {
    person: Person;
};

/** Displays a person's avatar, name, and basic metadata within a clickable card link. */
export function PersonIndexCard(
    {person}: IndexProps
): ReactElement {
    const {name, dob, nationality, profileImage, slug} = person;
    const formattedDOB = dob.toFormat("dd MMM, yyyy");
    const formattedNationality = ISO3166Alpha2CountryConstant[nationality];

    return (
        <LoggedLink to={`/admin/persons/get/${slug}`}>
            <Card className="transition-colors hover:border-primary/50">
                <CardContent className="p-4 h-full flex items-center space-x-4">
                    <CloudinaryAvatarImage
                        personName={name}
                        image={profileImage}
                        className="h-16 w-16 shadow-sm"
                    />

                    <div className="flex-1">
                        <h2 className="primary-text font-bold text-lg leading-tight line-clamp-1">
                            {name}
                        </h2>

                        <p className="secondary-text text-sm font-medium line-clamp-1">
                            {formattedDOB} • {formattedNationality}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </LoggedLink>
    );
}