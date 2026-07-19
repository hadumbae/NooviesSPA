/**
 * @fileoverview Card component for displaying a person's biographical data and career stats.
 */

import {ReactElement} from 'react';
import {Card, CardContent, Separator} from "@/views/common/_comp/ui";
import {DetailsCardSpan} from "@/views/common/_comp/text-display/spans/DetailsCardSpan.tsx";
import {ISO3166Alpha2CountryConstant} from "@/common/_const";
import {TextQuote} from "@/views/common/_comp/text-display/text-blocks/TextQuote.tsx";
import {Person} from "@/domains/persons";

/**
 * Props for the PersonDetailsCard component.
 */
type DetailCardProps = {
    person: Person;
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