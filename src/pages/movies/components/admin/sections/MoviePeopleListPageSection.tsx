import {FC} from 'react';
import {RoleType} from "@/pages/moviecredit/schemas/enums/RoleTypeEnumSchema.ts";
import {PopulatedMovieCredit} from "@/pages/moviecredit/schemas/model/references/MovieCreditPopulatedSchema.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import convertToTitleCase from "@/common/utility/convertToTitleCase.ts";
import MoviePersonDetailsCard from "@/pages/movies/components/admin/credits/cards/MoviePersonDetailsCard.tsx";

interface SectionProps {
    roleType: RoleType;
    credits: PopulatedMovieCredit[];
}

const MoviePeopleListPageSection: FC<SectionProps> = ({roleType, credits}) => {
    const displayRoleType = convertToTitleCase(roleType);

    if (credits.length === 0) {
        return <PageSection title={displayRoleType} srTitle="Credits" className="text-center">
            <span className="select-none text-neutral-400">No Credits</span>
        </PageSection>;
    }

    return <PageSection title={displayRoleType} srTitle="Credits">
        {credits.map(credit => <MoviePersonDetailsCard key={credit._id} credit={credit}/>)}
    </PageSection>;
};

export default MoviePeopleListPageSection;
