import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {TableOfContents} from "lucide-react";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import SeatSubmitForm from "@/pages/seats/components/SeatSubmitForm.tsx";
import {useNavigate} from "react-router-dom";
import {Seat} from "@/pages/seats/schema/SeatSchema.ts";

const SeatCreatePage: FC = () => {

    const navigate = useNavigate();
    const onSubmit = (seat: Seat) => {
        navigate(`/admin/seats/get/${seat._id}`);
    }

    return (
        <PageFlexWrapper>
            <header className="flex justify-between items-center">
                <div>
                    <HeaderTitle>Create Seat</HeaderTitle>
                    <HeaderDescription>Enter details and press on `Submit` to create seats.</HeaderDescription>
                </div>

                <HeaderLink to="/admin/seats">
                    <TableOfContents />
                </HeaderLink>
            </header>

            <section>
                <SeatSubmitForm onSubmit={onSubmit} />
            </section>
        </PageFlexWrapper>
    );
};

export default SeatCreatePage;
