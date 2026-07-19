/**
 * @fileoverview Card component for displaying detailed biographical information about a person.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {Person} from "@/domains/persons";
import {Card, CardContent, Separator} from "@/views/common/_comp/ui";
import {ISO3166Alpha2ShortCountryConstant} from "@/common/_const";
import {PersonProfileAvatar} from "@/views/admin/persons";
import {LabelContentList} from "@/views/common/_comp";

/** Props for the PersonInfoDetailsCard component. */
type CardProps = {
    person: Person;
    classNames?: {
        card?: string;
        content?: string;
    }
};

/** Displays a person's name, birth date, nationality, and biography in a formatted card. */
export function PersonInfoDetailsCard(
    {classNames, person: {name, dob, nationality, biography, profileImage}}: CardProps
): ReactElement {
    const formattedDOB = dob.toFormat("MMMM dd, yyyy");
    const formattedNationality = ISO3166Alpha2ShortCountryConstant[nationality];

    return (
        <Card className={classNames?.card}>
            <CardContent className={cn("p-3 space-y-3", classNames?.content)}>
                <div className="flex items-center space-x-5">
                    <PersonProfileAvatar
                        name={name}
                        imageLink={profileImage?.secure_url}
                        className="h-16 w-16 md:h-24 md:w-24"
                    />

                    <div className="space-y-2">
                        <h3 className="primary-text text-xl lg:text-3xl font-mono tracking-tight uppercase font-bold">
                            {name}
                        </h3>

                        <LabelContentList items={[
                            {key: "dob", label: "Born", content: formattedDOB},
                            {key: "nationality", label: "Nationality", content: formattedNationality},
                        ]}/>
                    </div>
                </div>

                <Separator/>

                <p className="primary-text whitespace-pre-line leading-relaxed">
                    {biography}
                </p>
            </CardContent>
        </Card>
    );
}