import type { InputHTMLAttributes } from "react";

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	prefix?: ReactNode;
	suffix?: ReactNode;
}
