import type { ReactElement } from "react";

interface IButtonBase {
	isLoading?: boolean;
}

export interface IButton
	extends IButtonBase,
		React.ButtonHTMLAttributes<HTMLButtonElement> {
	ref?: React.RefObject<HTMLButtonElement>;
}

export interface ILinkButton
	extends IButtonBase,
		React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	ref?: React.RefObject<HTMLAnchorElement>;
}

export type ButtonProps = IButton | ILinkButton;

export type IconButtonProps = ButtonProps & {
	"aria-label": string;
	children: ReactElement;
};
