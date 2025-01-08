import {FC} from 'react';
import {Link} from "react-router-dom";

interface Props {
    label: string;
    text: string | number;
    to?: string;
}

const DetailsCardSpan: FC<Props> = ({label, text, to}) => {
    return (
        <div className="flex flex-col space-y-0">
            <span className="text-[12px] text-neutral-500 uppercase">{label}</span>

            {
                to
                    ? <Link to={to} className="font-bold hover:underline">{text}</Link>
                    : <span className="font-bold">{text}</span>
            }

        </div>
    );
};

export default DetailsCardSpan;
