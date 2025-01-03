import {FC, PropsWithChildren} from 'react';

const TextQuote: FC<PropsWithChildren> = ({children}) => {
    return (
        <blockquote className="text-sm text-neutral-500 border-l-4 px-4 text-justify">
            {children}
        </blockquote>
    );
};

export default TextQuote;
