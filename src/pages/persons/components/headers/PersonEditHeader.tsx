import {FC} from 'react';
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Search} from "lucide-react";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    person: Person;
}

const PersonEditHeader: FC<Props> = ({person}) => {
    const {_id, name} = person;

    return (
        <header className={cn(
            "flex",
            "max-md:flex-col max-md:space-y-2",
            "md:justify-between md:items-center",
        )}>
            <section>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>Edit the details of the person `{name}`.</HeaderDescription>
            </section>

            <section className="flex justify-end items-center">
                <HeaderLink variant="link" to={`/admin/persons/get/${_id}`}>
                    <Search/> Details
                </HeaderLink>
            </section>
        </header>
    );
};

export default PersonEditHeader;
