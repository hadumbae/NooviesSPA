import {FC} from 'react';
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {format} from "date-fns";
import {TableOfContents} from "lucide-react";
import ShowingOptions from "@/pages/showings/components/ShowingOptions.tsx";
import {useNavigate} from "react-router-dom";
import {Button} from "@/common/components/ui/button.tsx";
import useValidatePopulatedShowing from "@/pages/showings/hooks/validation/useValidatePopulatedShowing.ts";

interface Props {
    showing: Showing;
}

const ShowingDetailsHeader: FC<Props> = ({showing}) => {
    const navigate = useNavigate();

    const parsedShowing = useValidatePopulatedShowing(showing);
    const {movie, screen, theatre} = parsedShowing;

    const {title: movieTitle, releaseDate} = movie;
    const {name: screenName} = screen;
    const {name: theatreName} = theatre;

    const formattedReleaseDate = format(releaseDate, "yyyy");

    const navigateToIndex = () => {
        navigate("/admin/showings");
    }

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>{movieTitle} ({formattedReleaseDate})</HeaderTitle>
                <HeaderDescription>
                    Showing on {screenName} at {theatreName}.
                </HeaderDescription>
            </div>

            <div className="space-x-2">
                <Button
                    variant="outline"
                    className="p-2"
                    onClick={navigateToIndex}
                >
                    <TableOfContents />
                </Button>

                <ShowingOptions
                    variant="outline"
                    className="p-2"
                    showing={showing}
                    onDelete={navigateToIndex}
                />
            </div>
        </header>
    );
};

export default ShowingDetailsHeader;
