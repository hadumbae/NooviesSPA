/**
 * @fileoverview A card component for displaying summary information about a person in a browse list.
 */

import {ReactElement} from "react";
import {Card, CardContent, CardHeader} from "@/common/components/ui";
import {PersonSummaryInfo} from "@/domains/persons/_feat/client-view-data";
import {Image} from "@/views/common/_comp";
import {cn} from "@/common/_feat";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";

/** Props for the BrowsePersonListCard component. */
type CardProps = {
    person: PersonSummaryInfo;
    classNames?: {
        card?: string;
        content?: string;
        image?: string;
        error?: string;
    }
};

/** Displays a person's profile image, name, and roles within a linked card. */
export function BrowsePersonListCard(
    {person, classNames}: CardProps
): ReactElement {
    return (
        <LoggedLink to={`/browse/persons/${person.slug}`}>
            <Card className="group h-full flex flex-col">
                <CardHeader className="p-0 overflow-hidden rounded-t-md">
                    <Image
                        src={person.profileImage?.secure_url}
                        alt={person.name}
                        errorText="Failed To Load Profile Image"
                        classNames={{
                            error: classNames?.error,
                            image: cn(
                                "aspect-square group-hover:scale-105 rounded-t-md",
                                "transition-transform duration-700 ease-out",
                                classNames?.image
                            ),
                        }}
                    />
                </CardHeader>
                <CardContent className="flex-1 p-4 flex flex-col justify-center">
                    <h2 className="primary-text tracking-widest font-extrabold uppercase">
                        {person.name}
                    </h2>
                    <h3 className="secondary-text text-sm font-bold">
                        {person.roleNames.join(" • ")}
                    </h3>
                </CardContent>
            </Card>
        </LoggedLink>
    );
}