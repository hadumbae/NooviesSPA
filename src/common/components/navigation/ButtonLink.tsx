import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import ButtonVariant from "@/common/type/ui/shad-cn-button/ButtonVariant.ts";
import ButtonSize from "@/common/type/ui/shad-cn-button/ButtonSize.ts";
import LoggedLink, {LoggedLinkProps} from "@/common/components/navigation/LoggedLink.tsx";

type ButtonProps = LoggedLinkProps & {
    /**
     * Visual style variant of the button.
     * Corresponds to ShadCN button variants.
     * @default "link"
     */
    variant?: ButtonVariant;

    /**
     * Size of the button (padding / font-size).
     * @default "default"
     */
    size?: ButtonSize;
};

/**
 * **ButtonLink**
 *
 * A reusable button component that behaves as a link.
 * It wraps `LoggedLink` while providing consistent
 * styling based on ShadCN button variants.
 *
 * ### Features
 * - Accepts `variant` and `size` props to match button UI variants.
 * - Automatically merges additional classNames.
 * - Inherits all props from `LoggedLink` (e.g., `href`, `target`).
 *
 * ### Usage
 * ```tsx
 * <ButtonLink href="/dashboard" variant="primary" size="lg">
 *   Go to Dashboard
 * </ButtonLink>
 * ```
 *
 * ### Notes
 * - `children` is required to display button content.
 * - Default styling adds `"text-neutral-400 hover:text-black"`.
 *
 * @param props - {@link ButtonProps} + React children
 * @returns {JSX.Element} A styled link rendered as a button
 */
const ButtonLink: FC<PropsWithChildren<ButtonProps>> = (props) => {
    const {children, className, variant = "link", size = "default", ...remProps} = props;
    const buttonCSS = cn(buttonVariants({variant, size}), "text-neutral-400 hover:text-black", className);

    return (
        <LoggedLink {...remProps} className={buttonCSS}>
            {children}
        </LoggedLink>
    );
};

export default ButtonLink;
