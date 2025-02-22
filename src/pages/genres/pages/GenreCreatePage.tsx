import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import GenreSubmitForm from "@/pages/genres/components/GenreSubmitForm.tsx";
import {Genre} from "@/pages/genres/schema/GenreSchema.ts";
import {useNavigate} from "react-router-dom";
import GenreCreateHeader from "@/pages/genres/components/headers/GenreCreateHeader.tsx";

const GenreCreatePage: FC = () => {
    const navigate = useNavigate();
    const onGenreSubmit = (genre: Genre) => {
        navigate(`/admin/genres/get/${genre._id}`);
    }

    return (
        <PageFlexWrapper className="max-md:space-y-2 space-y-10">
            <GenreCreateHeader />

            <section className="flex justify-center">
                <div className="max-md:w-full w-1/2">
                    <GenreSubmitForm onGenreSubmit={onGenreSubmit} />
                </div>
            </section>
        </PageFlexWrapper>
    );
};

export default GenreCreatePage;
