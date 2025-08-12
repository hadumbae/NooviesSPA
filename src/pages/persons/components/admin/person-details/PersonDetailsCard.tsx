import {FC} from 'react';
import {PersonDetails} from "@/pages/persons/schema/person/Person.types.ts";
import {format} from "date-fns";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";
import TextQuote from "@/common/components/text/TextQuote.tsx";

type DetailCardProps = {
    person: PersonDetails;
}

const PersonDetailsCard: FC<DetailCardProps> = ({person}) => {
    const {name, dob, nationality, biography, creditCount, movieCount} = person;

    const formattedDOB = format(dob, "dd MMM, yyyy");
    const formattedNationality = nationality in ISO3166Alpha2CountryConstant
        ? ISO3166Alpha2CountryConstant[nationality]
        : "Unknown";

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                <section>
                    <h1 className="text-lg font-bold">Personal Details</h1>
                    <Separator/>
                </section>

                <section className="grid grid-cols-2 gap-2">
                    <div className="col-span-2">
                        <DetailsCardSpan label="Name" text={name}/>
                    </div>
                    <DetailsCardSpan label="DoB" text={formattedDOB}/>
                    <DetailsCardSpan label="Nationality" text={formattedNationality}/>
                    <section className="col-span-2 space-y-1">
                        <h2 className="text-[12px] text-neutral-500 uppercase">Biography</h2>
                        <TextQuote className="col-span-2">{biography}</TextQuote>
                    </section>
                </section>

                <section>
                    <h1 className="text-lg font-bold">Credits</h1>
                    <Separator/>
                </section>

                <section className="grid grid-cols-2 gap-2">
                    <DetailsCardSpan label="Credited Roles" text={`${creditCount} Credits`}/>
                    <DetailsCardSpan label="Movies" text={`${movieCount} Movies`}/>
                </section>
            </CardContent>
        </Card>
    );
};

export default PersonDetailsCard;
