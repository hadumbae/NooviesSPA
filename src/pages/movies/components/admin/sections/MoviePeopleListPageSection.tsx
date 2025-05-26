import {FC} from 'react';
import {RoleType} from "@/pages/moviecredit/schemas/enums/RoleTypeEnumSchema.ts";
import MovieCrewDetailsCard from "@/pages/movies/components/admin/credits/MovieCrewDetailsCard.tsx";
import {PopulatedMovieCredit} from "@/pages/moviecredit/schemas/model/populated/MovieCreditPopulatedSchema.ts";
import MovieCastDetailsCard from "@/pages/movies/components/admin/credits/MovieCastDetailsCard.tsx";

interface SectionProps {
    roleType: RoleType;
    credits: PopulatedMovieCredit[];
}

const MoviePeopleListPageSection: FC<SectionProps> = ({roleType, credits}) => {
    if (credits.length === 0) {
        return <section>
            <h1 className="sr-only">Credits</h1>
            <span className="select-none text-neutral-400">No Credits</span>
        </section>;
    }

    return <section>
        <h1 className="sr-only">Credits</h1>
        {roleType === "CREW" && credits.map(credit => <MovieCrewDetailsCard credit={credit}/>)}
        {roleType === "CAST" && credits.map(credit => <MovieCastDetailsCard credit={credit}/>)}
    </section>;
};

export default MoviePeopleListPageSection;
