import type { ReactElement } from "react";

interface IButtonBase {
	isLoading?: boolean;
}

export interface IButton
	extends IButtonBase,
		React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface ILinkButton
	extends IButtonBase,
		React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
}

export type ButtonProps = IButton | ILinkButton;

export type IconButtonProps = Omit<ButtonProps, "children"> & {
	"aria-label": string;
	children: ReactElement;
};
