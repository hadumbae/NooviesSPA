import {ReactElement, ReactNode} from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/Sheet";
import {Button} from "@/common/components/ui/button.tsx";
import {UIOpenStateProps} from "@/common/types";

type PanelProps = UIOpenStateProps & {
    children?: ReactNode;
};

export function GenreImageUploadPanel(
    {children, isOpen, setIsOpen}: PanelProps
): ReactElement {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Upload Image</SheetTitle>
                    <SheetDescription>
                        Upload images for the genre. Select the image and click on "Upload".
                    </SheetDescription>
                </SheetHeader>

                <h1>GenreImageUploadPanel</h1>

                <SheetFooter>
                    <Button type="submit">Save changes</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}