import {FC, ReactNode, useState} from 'react';
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";
import {GenreFormValues} from "@/pages/genres/schema/form/GenreForm.types.ts";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import GenreSubmitFormContainer from "@/pages/genres/components/form/GenreSubmitFormContainer.tsx";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

type EditingProps =
    | { isEditing: true, genre: Genre }
    | { isEditing?: false, genre?: never };

type PanelProps = Omit<MutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> & EditingProps & {
    children?: ReactNode;
    onSubmitSuccess?: (genre: Genre) => void;
    onSubmitError?: (error: unknown) => void;
    presetValues?: Partial<GenreFormValues>;
    disableFields?: (keyof GenreFormValues)[];
    // className?: string;
};

const GenreSubmitFormPanel: FC<PanelProps> = (params) => {
    const [open, setOpen] = useState<boolean>(false);

    const {children, onSubmitSuccess, ...formOptions} = params;
    const {isEditing} = formOptions;

    const sheetTitle = `${isEditing ? "Update" : "Create"} Genre`;
    const sheetDescription = `${isEditing ? "Update" : "Create"} genres by submitting data.`;

    const defaultOpen = (
        <span className="text-neutral-400 hover:text-black cursor-pointer">
            Open
        </span>
    );

    const closeOnSubmit = (genre: Genre) => {
        setOpen(false);
        onSubmitSuccess && onSubmitSuccess(genre);
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {children ? children : defaultOpen}
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow">
                    <GenreSubmitFormContainer
                        onSubmitSuccess={closeOnSubmit}
                        {...formOptions}
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default GenreSubmitFormPanel;
