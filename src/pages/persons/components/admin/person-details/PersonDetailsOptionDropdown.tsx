import {FC, PropsWithChildren} from 'react';
import {Person, PersonDetails} from "@/pages/persons/schema/person/Person.types.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import {useNavigate} from "react-router-dom";

type OnPersonEditProps = Omit<FormMutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> & {
    onSubmitSuccess: (person: Person) => void;
    onSubmitError: (error: unknown) => void;
};

type OnPersonDeleteProps = Omit<FormMutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> & {
    onSubmitSuccess: () => void;
    onSubmitError: (error: unknown) => void;
};

type DropdownProps = {
    person: Person | PersonDetails;
    onEditProps?: OnPersonEditProps;
    onDeleteProps?: OnPersonDeleteProps;
}

const PersonDetailsOptionDropdown: FC<PropsWithChildren<DropdownProps>> = (params) => {
    const navigate = useNavigate();
    const {children, person} = params;

    const updateProfileImage = () => {
      navigate(`/admin/persons/get/${person._id}/images/profile`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{children ? children : "Open"}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="text-center" onClick={updateProfileImage}>
                    Update Profile Image
                </DropdownMenuItem>

                <DropdownMenuItem>
                    Edit Person Details
                </DropdownMenuItem>

                <DropdownMenuItem>
                    Delete Person
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default PersonDetailsOptionDropdown;
