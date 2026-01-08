import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {TableOfContents} from "lucide-react";
import ShowingOptions from "@/pages/showings/components/ShowingOptions.tsx";
import {useNavigate} from "react-router-dom";
import {Button} from "@/common/components/ui/button.tsx";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";

interface Props {
    showing: ShowingDetails;
}

const ShowingDetailsHeader: FC<Props> = ({showing}) => {
    const navigate = useNavigate();
    const {movie, screen, theatre} = showing;

    const {title: movieTitle, releaseDate} = movie;
    const {name: screenName} = screen;
    const {name: theatreName} = theatre;

    const formattedReleaseDate = releaseDate?.toFormat("yyyy") ?? "Unreleased";

    const navigateToIndex = () => {
        navigate("/admin/showings");
    }

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>{movieTitle} ({formattedReleaseDate})</HeaderTitle>
                <HeaderDescription>Showing on {screenName} at {theatreName}.</HeaderDescription>
            </div>

            <div className="space-x-2">
                <Button variant="outline" className="p-2" onClick={navigateToIndex}>
                    <TableOfContents/>
                </Button>

                <ShowingOptions
                    variant="outline"
                    className="p-2"
                    showing={showing}
                    onDeleteSuccess={navigateToIndex}
                />
            </div>
        </header>
    );
};

export default ShowingDetailsHeader;
