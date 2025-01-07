import {FC} from 'react';
import useFetchPerson from "@/pages/persons/hooks/useFetchPerson.ts";
import useFetchPersonParams from "@/pages/persons/hooks/useFetchPersonParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/HeaderDescription.tsx";
import {format} from "date-fns";
import TextQuote from "@/common/components/text/TextQuote.tsx";
import PersonOptions from "@/pages/persons/components/PersonOptions.tsx";
import {Link, useNavigate} from "react-router-dom";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {TableOfContents} from "lucide-react";

const PersonPage: FC = () => {
    const navigate = useNavigate();
    const {personID} = useFetchPersonParams();
    const {data: person, isPending, isError, error} = useFetchPerson({_id: personID!});

    const onDelete = () => {
        navigate("/admin/persons");
    }

    if (isPending) return <PageLoader />
    if (isError) return <PageError error={error} />

    const {name, dob, nationality, biography} = person;
    const formattedDOB = format(dob, "dd MMM, yyyy");

    return (
        <PageFlexWrapper>
            <header className="flex justify-between items-center">
                <div>
                    <HeaderTitle>{name}</HeaderTitle>
                    <HeaderDescription>{formattedDOB} | {nationality}</HeaderDescription>
                </div>

                <div className="flex items-center space-x-2">
                    <Link
                        className={buttonVariants({variant: "outline"})}
                        to={`/admin/persons`}
                    >
                        <TableOfContents />
                    </Link>

                    <PersonOptions
                        person={person}
                        variant="outline"
                        onPersonDelete={onDelete}
                    />
                </div>
            </header>

            <section className="px-10">
                <TextQuote>{biography}</TextQuote>
            </section>

            <section>
                <ol>

                </ol>
            </section>
        </PageFlexWrapper>
    );
};

export default PersonPage;
