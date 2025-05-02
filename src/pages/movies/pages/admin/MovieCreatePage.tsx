import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieCreateHeader from "@/pages/movies/components/headers/MovieCreateHeader.tsx";
import MovieSubmitForm from "@/pages/movies/components/MovieSubmitForm.tsx";
import {Movie} from "@/pages/movies/schema/MovieSchema.ts";
import {useNavigate} from "react-router-dom";

const MovieCreatePage: FC = () => {
    const navigate = useNavigate();
    const onSubmit = ({_id}: Movie) => {
        navigate(`/admin/movies/get/${_id}`);
    }

    return (
        <PageFlexWrapper>
            <MovieCreateHeader />

            <section>
                <MovieSubmitForm onSubmit={onSubmit} />
            </section>
        </PageFlexWrapper>
    );
};

export default MovieCreatePage;
