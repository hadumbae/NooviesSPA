import {ElementType, FC} from 'react';
import {Link} from "react-router-dom";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    /**
     * The element type to render when `to` is not provided.
     * Defaults to "span" if not specified.
     */
    as?: ElementType;

    /**
     * Additional CSS classes.
     */
    className?: string;

    /**
     * The label for the detail.
     */
    label: string;

    /**
     * The text or number to display.
     */
    text: string | number;

    /**
     * Optional URL to render the text as a link.
     */
    to?: string | null;
}

const DetailsCardSpan: FC<Props> = ({as: Component = "span", label, text, to, className}) => {
    return (
        <div className="flex flex-col space-y-0">
            <span className="text-[12px] text-neutral-500 uppercase">{label}</span>

            {
                to
                    ? <Link to={to} target="_blank" className={cn("font-bold hover:underline", className)}>{text}</Link>
                    : <Component className={cn("font-bold", className)}>{text}</Component>
            }

        </div>
    );
};

export default DetailsCardSpan;
