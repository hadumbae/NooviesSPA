import {FC} from 'react';

const LayoutBreakpointIndicator: FC = () => {
    return (
        <>
            <span className="sm:hidden">Is XS</span>
            <span className="max-sm:hidden md:hidden">Is SM</span>
            <span className="max-md:hidden lg:hidden">Is MD</span>
            <span className="max-lg:hidden xl:hidden">Is LG</span>
            <span className="max-xl:hidden 2xl:hidden">Is XL</span>
            <span className="max-2xl:hidden">Is 2XL</span>
        </>
    );
};

export default LayoutBreakpointIndicator;
