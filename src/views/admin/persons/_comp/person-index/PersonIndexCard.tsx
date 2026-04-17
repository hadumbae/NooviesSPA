/**
 * @fileoverview Card component for the administrative Person Index.
 * Displays a concise summary of a person's identity and metadata, serving as
 * a navigational entry point to their full profile.
 */

import { ReactElement } from 'react';
import { Card, CardContent } from "@/common/components/ui/card.tsx";
import CloudinaryAvatarImage from "@/common/components/images/CloudinaryAvatarImage.tsx";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";
import { Person } from "@/domains/persons/schema/person/Person.types.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/**
 * Props for the {@link PersonIndexCard} component.
 */
type IndexProps = {
    person: Person;
};

/**
 * Renders a summary card for a Person record.
 */
export function PersonIndexCard(
    { person }: IndexProps
): ReactElement {
    const { name, dob, nationality, profileImage, slug } = person;
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