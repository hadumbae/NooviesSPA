import {FC, useEffect} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import AuthLoginForm from "@/pages/auth/components/AuthLoginForm.tsx";
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";

const LoginPage: FC = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.showLoginError) {
            toast.error("An error occurred. Please log in.");
        }
    }, [location.state]);

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>Login</HeaderTitle>
                <HeaderDescription>Enter your credentials to login.</HeaderDescription>
            </header>

            <section>
                <AuthLoginForm/>
            </section>
        </PageFlexWrapper>
    );
};

export default LoginPage;
