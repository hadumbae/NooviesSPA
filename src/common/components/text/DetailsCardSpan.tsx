import {FC} from 'react';
import {Link} from "react-router-dom";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    label: string;
    text: string | number;
    to?: string | null;
    className?: string;
}

const DetailsCardSpan: FC<Props> = ({label, text, to, className}) => {
    return (
        <div className="flex flex-col space-y-0">
            <span className="text-[12px] text-neutral-500 uppercase">{label}</span>

            {
                to
                    ? <Link to={to} target="_blank" className={cn("font-bold hover:underline", className)}>{text}</Link>
                    : <span className={cn("font-bold", className)}>{text}</span>
            }

        </div>
    );
};

export default DetailsCardSpan;
