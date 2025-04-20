import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import AuthRegisterForm from "@/pages/auth/components/AuthRegisterForm.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import RegisterHeader from "@/pages/auth/components/headers/RegisterHeader.tsx";

// Jane Doe
// jane@doe.com
// eU/Y9xu?46(0(H8a~k{E<L?x^$F=a>\*

const RegisterPage: FC = () => {
    return (
        <PageFlexWrapper>
            <RegisterHeader />

            <section>
                <Card>
                    <CardContent className="p-3">
                        <AuthRegisterForm />
                    </CardContent>
                </Card>
            </section>
        </PageFlexWrapper>
    );
};

export default RegisterPage;
