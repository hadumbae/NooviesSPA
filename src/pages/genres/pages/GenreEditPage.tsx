import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import useFetchGenre from "@/pages/genres/hooks/useFetchGenre.ts";
import useFetchGenreParams from "@/pages/genres/hooks/useFetchGenreParams.ts";
import HeaderTitle from "@/common/components/page/HeaderTitle.tsx";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import HeaderDescription from "@/common/components/page/HeaderDescription.tsx";
import GenreSubmitForm from "@/pages/genres/components/GenreSubmitForm.tsx";
import {useNavigate} from "react-router-dom";

const GenreEditPage: FC = () => {
    const navigate = useNavigate();
    const {genreID} = useFetchGenreParams();
    const {data: genre, isPending, isError, error} = useFetchGenre({_id: genreID!});

    const onSubmit = () => {
        navigate(`/admin/genres/get/${genre && genre._id}`);
    }

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />

    const {name} = genre;

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>
                    Edit the genre ({name}) here. Click on 'Submit' to proceed.
                </HeaderDescription>
            </header>

            <section>
                <GenreSubmitForm genre={genre} onGenreSubmit={() => onSubmit()} />
            </section>
        </PageFlexWrapper>
    );
};

export default GenreEditPage;
