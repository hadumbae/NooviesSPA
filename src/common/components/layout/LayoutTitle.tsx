import {FC} from 'react';

interface Props {
    text: string;
}

const LayoutTitle: FC<Props> = ({text}) => {
    return (
        <h1 className="dotgothic16-regular text-3xl">
            {text}
        </h1>
    );
};

export default LayoutTitle;
