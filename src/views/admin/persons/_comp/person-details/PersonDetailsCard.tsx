/**
 * @fileoverview Card component for displaying a person's biographical data and career stats.
 */

import {ReactElement} from 'react';
import {PersonDetails} from "@/domains/persons/schema/person/Person.types.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";
import TextQuote from "@/common/components/text/TextQuote.tsx";

/**
 * Props for the PersonDetailsCard component.
 */
type DetailCardProps = {
    person: PersonDetails;
    creditCount: number;
    movieCount: number;
}

/**
 * Displays a structured summary of personal info and career metrics.
 */
export function PersonDetailsCard(
    {movieCount, creditCount, person: {name, dob, nationality, biography}}: DetailCardProps
): ReactElement {
    const formattedDOB = dob.toFormat("dd MMM, yyyy");
    const formattedNationality = nationality in ISO3166Alpha2CountryConstant
        ? ISO3166Alpha2CountryConstant[nationality]
        : "Unknown";

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <div>
                    <h1 className="subsection-title">Personal Details</h1>
                    <Separator/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <DetailsCardSpan label="Name" text={name}/>
                    </div>
                    <DetailsCardSpan label="DoB" text={formattedDOB}/>
                    <DetailsCardSpan label="Nationality" text={formattedNationality}/>

                    <div className="col-span-2 space-y-1">
                        <h2 className="text-[12px] text-neutral-500 uppercase">Biography</h2>
                        <TextQuote className="col-span-2">{biography}</TextQuote>
                    </div>
                </div>

                <div>
                    <h1 className="subsection-title">Credits</h1>
                    <Separator/>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <DetailsCardSpan label="Credited Roles" text={`${creditCount} Credits`}/>
                    <DetailsCardSpan label="Movies" text={`${movieCount} Movies`}/>
                </div>
            </CardContent>
        </Card>
    );
}