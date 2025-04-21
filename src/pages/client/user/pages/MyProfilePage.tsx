import {FC} from 'react';
import PageCenter from "@/common/components/page/PageCenter.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import useFetchAuthUserDetails from "@/common/hooks/useFetchAuthUserDetails.ts";

const MyProfilePage: FC = () => {
    const authUserDetails = useFetchAuthUserDetails();
    console.log(authUserDetails);

    return (
        <PageCenter>
            <HeaderTitle>My Profile Page</HeaderTitle>
        </PageCenter>
    );
};

export default MyProfilePage;
