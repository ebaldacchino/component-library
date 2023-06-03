import type { InputHTMLAttributes } from "react";

type TInputHTMLAttributes = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"placeholder"
>;

export interface IInput extends TInputHTMLAttributes {
	prefix?: ReactNode;
	suffix?: ReactNode;
}
