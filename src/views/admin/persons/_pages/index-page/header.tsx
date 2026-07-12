/**
 * @fileoverview Header component for the administrative Person Index page.
 *
 */

import {ReactElement, useState} from 'react';
import {Plus} from "lucide-react";
import {IconButton} from "@/views/common/_comp";
import {useNavigateToPerson} from "@/domains/persons/_feat/navigation";
import {HeaderDescription, HeaderTitle} from "@/views/common/_comp/page-headers";

import {Person} from "@/domains/persons/_schema/person/PersonSchema";
import {PersonSubmitForm, PersonSubmitFormPanel} from "@/views/admin/persons/_feat/submit-form";

/**
 * Header for the Persons administrative list that provides the trigger for creating new records.
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