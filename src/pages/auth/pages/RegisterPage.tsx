import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import AuthRegisterForm from "@/pages/auth/components/AuthRegisterForm.tsx";

// Jane Doe
// jane@doe.com
// eU/Y9xu?46(0(H8a~k{E<L?x^$F=a>\*

const RegisterPage: FC = () => {
    return (
        <PageFlexWrapper>
            <header>
                <h1 className="text-2xl font-bold">Register</h1>
                <span className="text-neutral-500 text-sm">Enter your details below to create an account.</span>
            </header>

            <section>
                <AuthRegisterForm />
            </section>
        </PageFlexWrapper>
    );
};

export default RegisterPage;
