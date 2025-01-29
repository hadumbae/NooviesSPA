import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Search, TableOfContents} from "lucide-react";
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import useValidatePopulatedShowing from "@/pages/showings/hooks/validation/useValidatePopulatedShowing.ts";

interface Props {
    showing: Showing;
}

const ShowingEditHeader: FC<Props> = ({showing}) => {
    const {_id, movie, screen, theatre} = useValidatePopulatedShowing(showing);

    const {title: movieTitle} = movie;
    const {name: screenName} = screen;
    const {name: theatreName} = theatre;

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>{movieTitle}</HeaderTitle>
                <HeaderDescription>Edit showing on {screenName} at {theatreName}.</HeaderDescription>
            </div>

            <div className="space-x-2">
                <HeaderLink to="/admin/showings">
                    <TableOfContents/>
                </HeaderLink>
                <HeaderLink to={`/admin/showings/get/${_id}`}>
                    <Search/>
                </HeaderLink>
            </div>
        </header>
    );
};

export default ShowingEditHeader;
