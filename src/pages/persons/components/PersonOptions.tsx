import {FC, useState} from 'react';
import usePersonDeleteMutation from "@/pages/persons/hooks/mutations/admin/usePersonDeleteMutation.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/common/components/ui/popover.tsx";
import {Button, buttonVariants} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Ellipsis, Loader} from "lucide-react";
import {Link} from "react-router-dom";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";

interface Props {
    person: Person;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link",
    className?: string,
    onDelete?: () => void;
}

const PersonOptions: FC<Props> = ({person, variant = "default", className, onDelete}) => {
    const {_id} = person;
    const {mutate, isPending, isSuccess} = usePersonDeleteMutation({onDelete: onDelete});

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const deletePerson = () => {
        setIsOpen(false);
        mutate({_id});
    }

    if (isPending) {
        return <div className="px-4 py-2">
            <Loader className="animate-spin" size={20}/>
        </div>;
    }

    return ( <Popover open={isOpen} onOpenChange={setIsOpen}>

        <PopoverTrigger asChild>
            <Button
                variant={variant}
                className={cn(className)}
            >
                <Ellipsis />
            </Button>
        </PopoverTrigger>

        <PopoverContent className="w-40 flex flex-col p-0">
            <Link
                className={buttonVariants({variant: "link"})}
                to={`/admin/persons/edit/${_id}`}
            >
                Edit
            </Link>

            <Button
                variant="link"
                onClick={deletePerson}
                disabled={isPending || isSuccess}
                className="disabled:text-neutral-400"
            >
                Delete
            </Button>
        </PopoverContent>

    </Popover>);
};

export default PersonOptions;
