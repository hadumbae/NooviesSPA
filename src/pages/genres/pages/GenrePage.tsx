import {FC} from 'react';
import useFetchGenre from "@/pages/genres/hooks/useFetchGenre.ts";
import useFetchGenreParams from "@/pages/genres/hooks/useFetchGenreParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/HeaderTitle.tsx";
import GenreOptions from "@/pages/genres/components/GenreOptions.tsx";
import {Link, useNavigate} from "react-router-dom";
import TextQuote from "@/common/components/text/TextQuote.tsx";
import {buttonVariants} from "@/common/components/ui/button.tsx";

const GenrePage: FC = () => {
    const navigate = useNavigate();
    const {genreID} = useFetchGenreParams();
    const {data: genre, isPending, isError, error} = useFetchGenre({_id: genreID!});

    const onDelete = () => {
        navigate("/admin/genres")
    }

    if (isPending) return <PageLoader />
    if (isError) return  <PageError error={error} />

    const {name, description} = genre;

    return (
        <PageFlexWrapper>
            <header className="flex justify-between items-center">
                <HeaderTitle>{name}</HeaderTitle>

                <div className="space-x-2 flex items-center">
                    <Link
                        className={buttonVariants({variant: "outline"})}
                        to="/admin/genres"
                    >
                        Index
                    </Link>

                    <GenreOptions
                        genre={genre}
                        variant="outline"
                        onGenreDelete={onDelete}
                    />
                </div>
            </header>

            <section>
                <TextQuote>{description}</TextQuote>
            </section>
        </PageFlexWrapper>
    );
};

export default GenrePage;
