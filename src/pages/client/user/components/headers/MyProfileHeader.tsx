import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import {AuthUserDetails} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";

interface MyProfileHeaderProps {
    authUser: AuthUserDetails;
}

const MyProfileHeader: FC<MyProfileHeaderProps> = ({authUser}) => {
    const {name} = authUser;

    return (
        <header>
            <section>
                <HeaderTitle>Hello, {name}!</HeaderTitle>
            </section>
        </header>
    );
};

export default MyProfileHeader;
