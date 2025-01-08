import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import GenreSubmitForm from "@/pages/genres/components/GenreSubmitForm.tsx";
import {Genre} from "@/pages/genres/schema/GenreSchema.ts";
import {useNavigate} from "react-router-dom";

const GenreCreatePage: FC = () => {
    const navigate = useNavigate();
    const onGenreSubmit = (genre: Genre) => {
        navigate(`/admin/genres/get/${genre._id}`);
    }

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>Create Genre</HeaderTitle>
                <HeaderDescription>Create genres here. Fill in the details and click on `Submit` to continue.</HeaderDescription>
            </header>

            <section>
                <GenreSubmitForm onGenreSubmit={onGenreSubmit} />
            </section>
        </PageFlexWrapper>
    );
};

export default GenreCreatePage;
