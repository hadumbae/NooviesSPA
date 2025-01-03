import {FC, PropsWithChildren} from 'react';

const PageFlexWrapper: FC<PropsWithChildren> = ({children}) => {
    return (
        <section className="h-full flex flex-col space-y-5">
            {children}
        </section>
    );
};

export default PageFlexWrapper;
