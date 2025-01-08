import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import AuthLoginForm from "@/pages/auth/components/AuthLoginForm.tsx";

const LoginPage: FC = () => {
    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>Login</HeaderTitle>
                <HeaderDescription>Enter your credentials to login.</HeaderDescription>
            </header>

            <section>
                <AuthLoginForm />
            </section>
        </PageFlexWrapper>
    );
};

export default LoginPage;
