import {FC} from 'react';
import PageSection from "@/common/components/page/PageSection.tsx";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import MoviePersonDetailsCard from "@/pages/movies/components/admin/credits/cards/MoviePersonDetailsCard.tsx";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";

interface SectionProps {
    roleType: RoleTypeDepartment;
    credits: MovieCreditDetails[];
}

const MoviePeopleListPageSection: FC<SectionProps> = ({roleType, credits}) => {
    const displayRoleType = convertToTitleCase(roleType);

    if (credits.length === 0) {
        return <PageSection title={displayRoleType} srTitle="Credits" className="text-center">
            <span className="select-none text-neutral-400">No Credits</span>
        </PageSection>;
    }

    return <PageSection title={displayRoleType} srTitle="Credits" className="space-y-3">
        {credits.map(credit => <MoviePersonDetailsCard key={credit._id} credit={credit}/>)}
    </PageSection>;
};

export default MoviePeopleListPageSection;
