/**
 * @file MyReservationPageHeader.tsx
 * Displays reservation page header metadata and navigation.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import {CloudinaryImage} from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import PosterImage from "@/pages/movies/components/images/PosterImage.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {Redo} from "lucide-react";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import buildString from "@/common/utility/buildString.ts";

/**
 * Props for MyReservationPageHeader.
 */
type HeaderProps = {
    movieTitle: string;
    releaseYear: string;
    genreNames: string;
    posterImage?: CloudinaryImage | null;
    isSpecialEvent?: boolean;
};

/**
 * Renders reservation header information.
 */
const MyReservationPageHeader = (
    {
        movieTitle,
        posterImage,
        releaseYear,
        genreNames,
        isSpecialEvent,
    }: HeaderProps
) => {
    const navigate = useLoggedNavigate();

    const navigateToProfile = () => {
        navigate({
            level: "log",
            to: "/account/profile?activeTab=reservations",
            component: MyReservationPageHeader.name,
            message: "Navigate back to reservations.",
        });
    };

    const metaString = buildString(
        [releaseYear, isSpecialEvent && "Special Event", genreNames],
        " | ",
    );

    return (
        <header className="flex items-center space-x-3">
            <section>
                <SectionHeader srOnly={true}>Poster Image</SectionHeader>
                <PosterImage src={posterImage?.secure_url} className="h-24"/>
            </section>

            <section className="flex-1 flex flex-col gap-2">
                <SectionHeader srOnly={true}>Reservation Meta</SectionHeader>
                <HeaderTitle>{movieTitle}</HeaderTitle>
                <HeaderDescription>{metaString}</HeaderDescription>
            </section>

            <section>
                <SectionHeader srOnly={true}>My Profile Button</SectionHeader>
                <IconButton onClick={navigateToProfile}>
                    <Redo/>
                </IconButton>
            </section>
        </header>
    );
};

export default MyReservationPageHeader;
