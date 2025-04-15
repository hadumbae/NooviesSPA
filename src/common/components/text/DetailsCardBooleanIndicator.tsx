import {FC} from 'react';
import {Dot} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

interface DetailsCardBooleanIndicatorProps {
    label: string;
    status?: boolean;
    className?: string;
}

const DetailsCardBooleanIndicator: FC<DetailsCardBooleanIndicatorProps> = ({label, status, className}) => {
    return (
        <div className={cn("flex justify-between items-center", className)}>
            <span>{label}</span>
            <Dot className={status ? "text-green-500" : "text-red-500"} />
        </div>
    );
};

export default DetailsCardBooleanIndicator;
