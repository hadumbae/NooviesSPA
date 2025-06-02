import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import convertToTitleCase from "@/common/utility/convertToTitleCase.ts";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ParamError} from "@/common/errors/ParamError.ts";
import {PopulatedMovieCredit} from "@/pages/moviecredit/schemas/model/references/MovieCreditPopulatedSchema.ts";

interface HeaderProps {
    credit: PopulatedMovieCredit;
}

const MoviePersonEditHeader: FC<HeaderProps> = ({credit}) => {
    const {roleType, person: {name}} = credit;
    const parsedType = convertToTitleCase(roleType);

    if (roleType !== "CAST" && roleType !== "CREW") {
        throw new ParamError({
            fnName: MoviePersonEditHeader.name,
            paramName: "credit.roleType",
            message: "Invalid Role Type",
        });
    }

    let creditString;

    if (roleType === "CAST") {
        const {characterName} = credit;
        creditString = `${name} | ${characterName}`;
    }

    if (roleType === "CREW") {
        const {job} = credit;
        creditString = `${name} | ${job}`;
    }

    return (
        <header className={cn(
            "flex ",
            "max-md:flex-col max-md:space-y-5",
            "md:justify-between md:items-center"
        )}>
            <section>
                <HeaderTitle>Edit Movie Credit</HeaderTitle>
                <HeaderDescription>{parsedType} | {creditString}</HeaderDescription>
            </section>
        </header>
    );
};

export default MoviePersonEditHeader;
