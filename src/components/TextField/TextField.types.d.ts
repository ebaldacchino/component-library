import type { ReactNode } from "react";

export interface ITextField
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean | string;
	label: string;
	prefix?: ReactNode;
	suffix?: ReactNode;
	value: string;
}
