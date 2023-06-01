import { forwardRef } from "react";
import type { ITextField } from "./TextField.types";
import { Input } from "../Input";
import { FormControl } from "../FormControl/FormControl";

export const TextField = forwardRef<HTMLInputElement, ITextField>(
	(props, ref) => {
		return (
			<FormControl {...props}>
				<Input {...props} ref={ref} />
			</FormControl>
		);
	}
);
