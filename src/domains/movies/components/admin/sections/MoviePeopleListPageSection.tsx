import {FC} from 'react';
import PageSection from "@/views/common/_comp/page/PageSection.tsx";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import MoviePersonDetailsCard from "@/domains/movies/components/admin/credits/cards/MoviePersonDetailsCard.tsx";
import {RoleTypeDepartment} from "@/domains/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {
    MovieCreditDetails
} from "@/domains/moviecredit/schemas/model/movie-credit-details-schema/MovieCreditDetails.types.ts";

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
