import type { InputHTMLAttributes, ReactNode } from "react";

type TInputHTMLAttributes = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"placeholder" | "prefix"
>;

export interface InputProps extends TInputHTMLAttributes {
	prefix?: ReactNode;
	suffix?: ReactNode;
}
