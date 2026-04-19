/**
 * @fileoverview Header component for the administrative Person Index page.
 * Provides section context and the primary entry point for creating new records.
 */

import {ReactElement, useState} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Plus} from "lucide-react";
import {Person} from "@/domains/persons/schema/person/Person.types.ts";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {useNavigateToPerson} from "@/domains/persons/_feat/navigation";
import {PersonSubmitForm, PersonSubmitFormPanel} from "@/views/admin/persons/_feat/submit-form";

/**
 * Renders the header for the Persons administrative list.
 */
export function PersonIndexHeader(): ReactElement {
    const navigate = useNavigateToPerson();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onSubmit = ({slug}: Person) => navigate({
        slug,
        message: "Navigate to details after creating person.",
    });

    return (
        <header className="flex justify-between items-center">
            <section>
                <HeaderTitle>Persons</HeaderTitle>
                <HeaderDescription>The actors and crew behind movies.</HeaderDescription>
            </section>

            <PersonSubmitForm onSubmitSuccess={onSubmit}>
                <PersonSubmitFormPanel isOpen={isOpen} setIsOpen={setIsOpen}>
                    <IconButton variant="link" icon={Plus}/>
                </PersonSubmitFormPanel>
            </PersonSubmitForm>
        </header>
    );
}