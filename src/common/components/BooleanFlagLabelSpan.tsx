import {FC} from 'react';
import {Badge} from "@/common/components/ui/badge.tsx";
import {BadgeCheckIcon} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

interface FlagProps {
    label: string,
    flag: boolean
}

const BooleanFlagLabelSpan: FC<FlagProps> = ({label, flag}) => {
    return (
        <Badge
            variant="outline"
            className={cn(
                "flex justify-between items-center",
                flag ? "border-green-500" : "border-red-500"
            )}
        >
            <span className="select-none">{label}</span>
            <BadgeCheckIcon className={flag ? "text-green-500" : "text-red-500"} />
        </Badge>
    );
};

export default BooleanFlagLabelSpan;
