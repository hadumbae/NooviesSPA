import {ReactElement} from "react";
import {ImageUp, Loader} from "lucide-react";
import {Button} from "@/views/common/_comp/ui";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";

type ActionProps = {
    classNames?: {
        container?: string;
        button?: string
    };
};

export function MoviePosterImageSubmitFormActions(
    {classNames}: ActionProps
): ReactElement {
    const {isPending} = useBaseFormContext();

    return (
        <div className={classNames?.container}>
            <Button
                variant="primary"
                disabled={isPending}
                className={classNames?.button}
                aria-busy={isPending}
            >
                {isPending ? <Loader className="animate-spin"/> : <> <ImageUp/> Upload </>}
            </Button>
        </div>
    );
}