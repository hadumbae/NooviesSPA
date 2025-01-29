import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import useFetchGenre from "@/pages/genres/hooks/useFetchGenre.ts";
import useFetchGenreParams from "@/pages/genres/hooks/useFetchGenreParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import GenreSubmitForm from "@/pages/genres/components/GenreSubmitForm.tsx";
import {useNavigate} from "react-router-dom";
import GenreEditHeader from "@/pages/genres/components/headers/GenreEditHeader.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";

const GenreEditPage: FC = () => {
    useTitle("Edit Genre")

    const navigate = useNavigate();
    const {genreID} = useFetchGenreParams();
    const {data: genre, isPending, isError, error} = useFetchGenre({_id: genreID!});

    useTitle(genre && `Edit ${genre.name}`)

    if (isPending) return <PageLoader/>;
    if (isError) return <PageError error={error}/>

    const onSubmit = () => navigate(`/admin/genres/get/${genre._id}`);

    return (
        <PageFlexWrapper>
            {/* Header */}
            <GenreEditHeader genre={genre}/>

            {/* Form */}
            <section>
                <GenreSubmitForm genre={genre} onGenreSubmit={() => onSubmit()}/>
            </section>
        </PageFlexWrapper>
    );
};

export default GenreEditPage;
