import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingCreateHeader from "@/pages/showings/components/headers/ShowingCreateHeader.tsx";
import ShowingSubmitFormContainer from "@/pages/showings/components/forms/ShowingSubmitFormContainer.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";

const ShowingCreatePage: FC = () => {
    const onSubmit = (showing: Showing) => {
        console.log("Created Showing: ", showing)
    }

    return (
        <PageFlexWrapper>
            <ShowingCreateHeader />

            <Card>
                <CardContent className="p-3">
                    <ShowingSubmitFormContainer
                        onSubmitSuccess={onSubmit}
                    />
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
};

export default ShowingCreatePage;
