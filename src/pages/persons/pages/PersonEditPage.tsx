import {FC} from 'react';
import useFetchPersonParams from "@/pages/persons/hooks/useFetchPersonParams.ts";
import useFetchPerson from "@/pages/persons/hooks/useFetchPerson.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/HeaderDescription.tsx";
import PersonSubmitForm from "@/pages/persons/components/PersonSubmitForm.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {Search} from "lucide-react";

const PersonEditPage: FC = () => {
    const navigate = useNavigate();
    const {personID} = useFetchPersonParams();
    const {data: person, isPending, isError, error} = useFetchPerson({_id: personID!});

    const onEdit = (person: Person) => {
        navigate(`/admin/persons/get/${person._id}`);
    }

    if (isPending) return <PageLoader />
    if (isError) return <PageError error={error} />


    const {_id, name} = person;

    return (
        <PageFlexWrapper>
            <header className="flex justify-between items-center">
                <div>
                    <HeaderTitle>{name}</HeaderTitle>
                    <HeaderDescription>Edit the details of the person `{name}`.</HeaderDescription>
                </div>

                <Link
                    className={buttonVariants({variant: "outline"})}
                    to={`/admin/persons/get/${_id}`}
                >
                    <Search />
                </Link>
            </header>

            <section>
                <PersonSubmitForm onSubmit={onEdit} person={person} />
            </section>
        </PageFlexWrapper>
    );
};

export default PersonEditPage;
