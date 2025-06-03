import {FC} from 'react';
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import {ChevronRight} from "lucide-react";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {RoleType} from "@/pages/moviecredit/schemas/enums/RoleTypeEnumSchema.ts";
import convertToTitleCase from "@/common/utility/convertToTitleCase.ts";
import MovieDetailsPersonListPreviewCard
    from "@/pages/movies/components/admin/credits/cards/MovieDetailsPersonListPreviewCard.tsx";
import {PopulatedMovieCredit} from "@/pages/moviecredit/schemas/model/references/MovieCreditPopulatedSchema.ts";

interface CreditProps {
    movieID: ObjectId;
    roleType: RoleType;
    credits: PopulatedMovieCredit[];
}

const MovieDetailsCreditPageSection: FC<CreditProps> = ({movieID, roleType, credits}) => {
    const redirectPath = `/admin/movies/get/${movieID}/people/${roleType.toLowerCase()}`;
    const parsedRoleType = convertToTitleCase(roleType);

    if (credits.length === 0) {
        return <PageSection title={parsedRoleType} srTitle={`Movie ${parsedRoleType}`}
                            className="flex flex-col justify-center items-end">
            <div className="w-full h-24 flex justify-center items-center">
                <span className="text-neutral-400 select-none">There Are No {parsedRoleType}</span>
            </div>

            <ButtonLink to={redirectPath}>
                <ChevronRight/> More Crew
            </ButtonLink>
        </PageSection>
    }

    return (
        <PageSection
            title={parsedRoleType} srTitle={`Movie ${parsedRoleType}`}
            className="flex flex-col justify-center items-end space-y-3"
        >
            <section className="w-full grid grid-cols-2 gap-2">
                {
                    credits
                        .slice(0, 5)
                        .map((credit) => <MovieDetailsPersonListPreviewCard key={credit._id} credit={credit}/>)
                }
            </section>

            <ButtonLink to={redirectPath}>
                <ChevronRight/> More {parsedRoleType}
            </ButtonLink>
        </PageSection>
    );
};

export default MovieDetailsCreditPageSection;
